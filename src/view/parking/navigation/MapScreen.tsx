import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {useSearchAvailabilities, useSearchState, useSpace} from '@/state';
import {getAvailabilityCost} from '@/api';
import {AvailabilityData, LoadingSpinner} from '@/view/shared';
import {MapCard, MapMarker, SearchBar, SearchBarState} from '../components';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {Region} from 'react-native-maps';

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
  const inset = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const mapHeight =
    Dimensions.get('window').height - inset.bottom - tabBarHeight - 76;

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
  const sb = useSearchState();

  useEffect(() => {
    if (sb) {
      if (sb.location?.data) {
        const regionDelta =
          sb.location.data.description.split(',').length > 3 ? 0.02 : 0.3;
        setLocation({
          latitude: sb.location.latitude,
          longitude: sb.location.longitude,
          latitudeDelta: regionDelta,
          longitudeDelta: regionDelta,
        });
      }
      setStartDate(sb.startDate);
      setEndDate(sb.endDate);
    }
  }, [sb]);

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

  const onSearchRegion = useCallback(
    (region: Region) => {
      setLocation(region);
      sb.setLocation({
        latitude: region.latitude,
        longitude: region.longitude,
        data: null,
        detail: null,
      });
    },
    [sb],
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.topBar}>
          <SearchBar />
        </View>
        <View style={[styles.map, {height: mapHeight}]}>
          <Suspense fallback={<LoadingSpinner />}>
            <AvailabilityMap
              location={location}
              markers={markers}
              onSearchRegion={onSearchRegion}
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
      zIndex: 1,
      height: 76,
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    map: {
      zIndex: -1,
    },
  });
