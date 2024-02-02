import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {Text} from '../common';
import {useTheme, AppTheme} from '@/view/theme';
import {Availability, Building, SpaceResult} from '@/api';
import {useLocation} from '@/state/useLocation';

export type AvailabilityData = {
  availability: Availability;
  space: SpaceResult;
  building: Building;
};

const initialRegion = {
  latitude: 43.442384,
  longitude: -80.51516,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

type AvailabilityMapProps = {
  markers?: AvailabilityData[];
  location?: Region;
  renderMarker?: (
    marker: AvailabilityData,
    isSelected: boolean,
  ) => React.ReactNode;
  renderMarkerCard?: (marker: AvailabilityData) => React.ReactNode;
  onSearchRegion?: (region: Region) => void;
  onMarkerSelected?: (marker: AvailabilityData) => void;
};

export const AvailabilityMap = ({
  markers,
  location,
  renderMarker,
  renderMarkerCard,
  onSearchRegion,
  onMarkerSelected,
}: AvailabilityMapProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>(initialRegion);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<AvailabilityData>(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const [searchedState, setSearchedState] = useState<Region>(null);
  useLocation();

  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion(location, 1000);
      if (!searchedState) {
        setSearchedState(location);
      }
    }
  }, [location]);

  useEffect(() => {
    // deselect marker if its not longer in the list
    if (
      selectedMarker &&
      !markers?.find(m => m.availability.id === selectedMarker.availability.id)
    ) {
      setSelectedMarker(null);
    }
  }, [markers, selectedMarker]);

  const handleRegionChange = useCallback(
    (r: Region) => {
      setRegion(r);

      if (!showRefresh && searchedState) {
        const latDiff = Math.abs(r.latitude - searchedState.latitude);
        const longDiff = Math.abs(r.longitude - searchedState.longitude);
        const latRange = searchedState.latitudeDelta / 4;
        const longRange = searchedState.longitudeDelta / 4;
        if (latDiff > latRange || longDiff > longRange) {
          setShowRefresh(true);
        }
      }
    },
    [searchedState, showRefresh],
  );

  const onMarkerPress = useCallback(
    (e: MarkerPressEvent) => {
      e.stopPropagation();
      const markerId = +e.nativeEvent.id;
      const markerData = markers.find(m => m.availability?.id === markerId);
      setSelectedMarker(markerData);
      onMarkerSelected?.(markerData);
    },
    [markers],
  );

  const handleSearchAreaPress = useCallback(() => {
    setShowRefresh(false);
    setSearchedState(region);
    onSearchRegion?.(region);
  }, [region]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{height: '100%'}}
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
              {renderMarker?.(marker, marker === selectedMarker)}
            </Marker>
          ))}
      </MapView>
      {selectedMarker && (
        <View style={styles.bottomCard}>
          {renderMarkerCard?.(selectedMarker)}
        </View>
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
    bottomCard: {
      position: 'absolute',
      bottom: 24,
      left: 10,
      right: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });
