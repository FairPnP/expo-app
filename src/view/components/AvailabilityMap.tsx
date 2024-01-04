import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MapView, {
  LatLng,
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {useTheme, AppTheme, Text} from '@/common';
import {ReservationAPI} from '@/reservations';
import {Building} from '@/buildings';
import { Availability, AvailabilityAPI, MapCard, MapMarker, SpaceResult, getAvailabilityCost } from '@/availability';

export type AvailabilityData = {
  availability: Availability;
  space: SpaceResult;
  building: Building;
};

const REGION_DELTA = 0.01;

const initialRegion = {
  latitude: 43.442384,
  longitude: -80.51516,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

type Props = {
  startDate: Date;
  endDate: Date;
  selectedLocation?: LatLng;
};

type SearchedState = {
  region: Region;
  startDate: Date;
  endDate: Date;
};

export const AvailabilityMap = ({
  startDate,
  endDate,
  selectedLocation,
}: Props) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(initialRegion);
  const [isLoaded, setLoaded] = useState(false);
  const [markers, setMarkers] = useState<AvailabilityData[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<AvailabilityData>(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const [searchedState, setSearchedState] = useState<SearchedState>(null);

  useEffect(() => {
    if (selectedLocation) {
      const selectedRegion = {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: REGION_DELTA,
        longitudeDelta: REGION_DELTA,
      };
      mapRef.current?.animateToRegion(selectedRegion, 2000);
      setRegion(selectedRegion);
    }
  }, [selectedLocation]);

  const getAvailability = useCallback(async () => {
    const list: AvailabilityData[] = [];
    const avail = await AvailabilityAPI.search({
      start_date: startDate.toISOString().slice(0, 19),
      end_date: endDate.toISOString().slice(0, 19),
      latitude: region.latitude,
      longitude: region.longitude,
      lat_delta: region.latitudeDelta / 2,
      long_delta: region.longitudeDelta / 2,
    });

    for (const a of avail.availabilities) {
      const space = avail.spaces.find(s => s.id === a.space_id);
      const building = avail.buildings.find(b => b.id === space.building_id);

      list.push({
        availability: a,
        space: space,
        building: building,
      });
    }

    // if duplicate building_ids, only keep the one with the lowest hourly rate
    const filteredList: AvailabilityData[] = [];
    // unique building ids
    const buildingIds = list
      .map(l => l.building.id)
      .filter((v, i, a) => {
        return a.indexOf(v) === i;
      });
    for (const id of buildingIds) {
      const filtered = list.filter(l => l.building.id === id);
      const min = Math.min(...filtered.map(l => l.availability.hourly_rate));
      const minAvailability = filtered.find(
        l => l.availability.hourly_rate === min,
      );
      filteredList.push(minAvailability);
    }

    setMarkers(filteredList);
    setSelectedMarker(
      list.find(m => m.availability.id === selectedMarker?.availability?.id),
    );
    setShowRefresh(false);
    setSearchedState({
      region: region,
      startDate: startDate,
      endDate: endDate,
    });
  }, [endDate, region, selectedMarker?.availability?.id, startDate]);

  const handleRegionChange = useCallback(
    (r: Region) => {
      setRegion(r);

      if (!searchedState) {
        getAvailability();
      }

      if (!showRefresh && searchedState) {
        const latDiff = Math.abs(r.latitude - searchedState.region.latitude);
        const longDiff = Math.abs(r.longitude - searchedState.region.longitude);
        const latRange = searchedState.region.latitudeDelta / 2;
        const longRange = searchedState.region.longitudeDelta / 2;
        if (latDiff > latRange || longDiff > longRange) {
          setShowRefresh(true);
        }
      }
    },
    [getAvailability, searchedState, showRefresh],
  );

  const onMarkerPress = useCallback(
    (e: MarkerPressEvent) => {
      e.stopPropagation();
      const markerId = +e.nativeEvent.id;
      const markerData = markers.find(m => m.availability?.id === markerId);
      setSelectedMarker(markerData);
    },
    [markers],
  );

  const handleBooking = useCallback(async () => {
    await ReservationAPI.create({
      availability_id: +selectedMarker.availability.id,
      start_date: startDate.toISOString().slice(0, 19),
      end_date: endDate.toISOString().slice(0, 19),
    });

    Alert.alert('Success', 'Your spot has been booked!');

    getAvailability();
  }, [endDate, getAvailability, selectedMarker?.availability?.id, startDate]);

  const handleSearchAreaPress = useCallback(() => {
    getAvailability();
  }, [getAvailability]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        loadingEnabled={true}
        onMapReady={() => setLoaded(true)}
        onRegionChange={handleRegionChange}
        onMarkerPress={onMarkerPress}
        loadingIndicatorColor={theme.colors.primary}
        moveOnMarkerPress={false}
        toolbarEnabled={false}>
        {isLoaded &&
          markers.map(marker => (
            <Marker
              key={marker.availability.id}
              tracksInfoWindowChanges={false}
              tracksViewChanges={false}
              focusable={true}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              stopPropagation={true}
              coordinate={{
                latitude: marker.building.latitude,
                longitude: marker.building.longitude,
              }}
              identifier={marker.availability.id.toString()}>
              <MapMarker
                text={`$${getAvailabilityCost(
                  marker.availability,
                  startDate,
                  endDate,
                )}`}
                isSelected={
                  marker.availability.id === selectedMarker?.availability.id
                }
              />
            </Marker>
          ))}
      </MapView>
      {selectedMarker && (
        <MapCard
          markerData={selectedMarker}
          startDate={startDate}
          endDate={endDate}
          onHandleBooking={handleBooking}
        />
      )}
      {searchedState && markers.length === 0 && (
        <View style={styles.no_spots}>
          <Text>No spots available</Text>
          <Text>Try a different place or time</Text>
        </View>
      )}
      {showRefresh && (
        <TouchableOpacity
          onPress={handleSearchAreaPress}
          style={styles.search_area_button}>
          <Text>Search this area</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    no_spots: {
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      bottom: 24,
      padding: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    search_area_button: {
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      top: 24,
      padding: 6,
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });
