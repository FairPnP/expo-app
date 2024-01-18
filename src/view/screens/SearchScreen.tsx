import React, {Suspense, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Platform, KeyboardAvoidingView} from 'react-native';
import {AppTheme, LoadingSpinner, useTheme} from '@/common';
import {useLocationPermission} from '@/common/hooks/useLocationPermission';
import {AvailabilityData, SearchBar} from '../components';
import {
  AvailabilityAPI,
  MapCard,
  MapMarker,
  getAvailabilityCost,
} from '@/availability';
import type {SearchBarState} from '../state';
import {Space, SpaceAPI} from '@/spaces';

const AvailabilityMap = React.lazy(() =>
  import('../components/AvailabilityMap').then(module => ({
    default: module.AvailabilityMap,
  })),
);

const initialRegion = {
  latitude: 43.442384,
  longitude: -80.51516,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

const REGION_DELTA = 0.02;

export const SearchScreen = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [searchResults, setSearchResults] = useState([]);

  const [location, setLocation] = useState(initialRegion);
  const today = new Date();
  today.setHours(today.getHours() + 1, 0, 0, 0);
  const later = new Date(today);
  later.setHours(later.getHours() + 4);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(later);
  const [selectedSpace, setSelectedSpace] = useState<Space>(null);

  useLocationPermission();

  const getAvailability = useCallback(async () => {
    const list: AvailabilityData[] = [];
    const avail = await AvailabilityAPI.search({
      start_date: startDate.toISOString().slice(0, 19),
      end_date: endDate.toISOString().slice(0, 19),
      latitude: location.latitude,
      longitude: location.longitude,
      lat_delta: location.latitudeDelta / 2,
      long_delta: location.longitudeDelta / 2,
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

    setSearchResults(filteredList);
  }, [startDate, endDate, location]);

  useEffect(() => {
    getAvailability();
  }, [getAvailability]);

  const renderMarker = useCallback(
    (marker: AvailabilityData, isSelected: boolean) => {
      return (
        <MapMarker
          text={`$${getAvailabilityCost(
            marker.availability.hourly_rate,
            startDate,
            endDate,
          )}`}
          isSelected={isSelected}
        />
      );
    },
    [startDate, endDate],
  );

  const renderMarkerCard = useCallback(
    (marker: AvailabilityData) => {
      return (
        <MapCard
          building={marker.building}
          space={selectedSpace}
          availability={marker.availability}
          startDate={startDate}
          endDate={endDate}
        />
      );
    },
    [startDate, endDate, selectedSpace],
  );

  const onSearchBarSubmit = useCallback(
    (state: SearchBarState) => {
      if (state.location) {
        setLocation({
          latitude: state.location.latitude,
          longitude: state.location.longitude,
          latitudeDelta: REGION_DELTA,
          longitudeDelta: REGION_DELTA,
        });
      }
      setStartDate(state.startDate);
      setEndDate(state.endDate);
    },
    [getAvailability],
  );

  const onMarkerSelected = useCallback(async (marker: AvailabilityData) => {
    const res = await SpaceAPI.read(marker.space.id);
    setSelectedSpace(res.space);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar onSubmit={onSearchBarSubmit} />
      </View>
      <View style={styles.map}>
        <Suspense fallback={<LoadingSpinner />}>
          <AvailabilityMap
            location={location}
            markers={searchResults}
            onSearchRegion={setLocation}
            renderMarker={renderMarker}
            renderMarkerCard={renderMarkerCard}
            onMarkerSelected={onMarkerSelected}
          />
        </Suspense>
      </View>
    </KeyboardAvoidingView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topBar: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    map: {
      flex: 1,
      zIndex: -1,
    },
  });
