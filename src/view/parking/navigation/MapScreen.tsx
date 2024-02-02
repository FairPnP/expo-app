import React, {Suspense, useCallback, useMemo, useState} from 'react';
import {StyleSheet, View, Platform, KeyboardAvoidingView} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {useSearchAvailabilities, useSpace} from '@/state';

import {getAvailabilityCost} from '@/api';
import {AvailabilityData, LoadingSpinner, Text} from '@/view/shared';
import {MapCard, MapMarker, SearchBar, SearchBarState} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';

const AvailabilityMap = React.lazy(() =>
  import('@/view/shared/components/availabilities/AvailabilityMap').then(
    module => ({
      default: module.AvailabilityMap,
    }),
  ),
);

const initialRegion = {
  latitude: 43.442384,
  longitude: -80.51516,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

const REGION_DELTA = 0.02;

export const MapScreen = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const [location, setLocation] = useState(initialRegion);
  const today = new Date();
  today.setHours(today.getHours() + 1, 0, 0, 0);
  const later = new Date(today);
  later.setHours(later.getHours() + 4);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(later);
  const [selectedMarker, setSelectedMarker] = useState<AvailabilityData>(null);
  const {data: searchResults} = useSearchAvailabilities({
    start_date: startDate.toISOString().slice(0, 19),
    end_date: endDate.toISOString().slice(0, 19),
    latitude: location.latitude,
    longitude: location.longitude,
    lat_delta: location.latitudeDelta / 2,
    long_delta: location.longitudeDelta / 2,
  });
  const {data: selectedSpace} = useSpace(selectedMarker?.space.id);

  const markers = useMemo(() => {
    const list: AvailabilityData[] = [];
    if (!searchResults) {
      return list;
    }

    for (const a of searchResults.availabilities) {
      const space = searchResults.spaces[a.space_id];
      const building = searchResults.buildings[space.building_id];

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

    return filteredList;
  }, [startDate, endDate, location, searchResults]);

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
    [
      setLocation,
      setStartDate,
      setEndDate,
      location.latitudeDelta,
      location.longitudeDelta,
    ],
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topBar}>
          <SearchBar onSubmit={onSearchBarSubmit} />
        </View>
        <View style={styles.map}>
          <Suspense fallback={<LoadingSpinner />}>
            <AvailabilityMap
              location={location}
              markers={markers}
              onSearchRegion={setLocation}
              renderMarker={renderMarker}
              renderMarkerCard={renderMarkerCard}
              onMarkerSelected={setSelectedMarker}
            />
          </Suspense>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topBar: {
      height: '10%',
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    map: {
      height: '90%',
      zIndex: -1,
    },
  });
