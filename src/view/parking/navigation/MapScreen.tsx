import React, {
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { useTheme, AppTheme } from '@/view/theme';
import { useSearchAvailabilities, useSearchState, useSpace } from '@/state';
import { getAvailabilityCost } from '@/api';
import { AvailabilityData, LoadingSpinner } from '@/view/shared';
import { MapCard, MapMarker, SearchBar } from '../components';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Region } from 'react-native-maps';

const AvailabilityMap = React.lazy(() =>
  import('@/view/shared/components/availabilities/AvailabilityMap').then(
    module => ({
      default: module.AvailabilityMap,
    }),
  ),
);

export const MapScreen = ({ }) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const inset = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const mapHeight =
    Dimensions.get('window').height - inset.bottom - tabBarHeight - 72;

  const sb = useSearchState();
  const [selectedMarker, setSelectedMarker] = useState<AvailabilityData>(null);
  const { data: searchResults } = useSearchAvailabilities({
    start_date: sb.startDate.toISOString().slice(0, 19),
    end_date: sb.endDate.toISOString().slice(0, 19),
    latitude: sb.location.latitude,
    longitude: sb.location.longitude,
    lat_delta: sb.location.latitudeDelta / 2,
    long_delta: sb.location.longitudeDelta / 2,
  });
  const { data: selectedSpace } = useSpace(selectedMarker?.space.id);

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
  }, [searchResults]);

  const renderMarker = useCallback(
    (marker: AvailabilityData, isSelected: boolean) => {
      return (
        <MapMarker
          text={`$${getAvailabilityCost(
            marker.availability.hourly_rate,
            sb.startDate,
            sb.endDate,
          )}`}
          isSelected={isSelected}
        />
      );
    },
    [sb.startDate, sb.endDate],
  );

  const renderMarkerCard = useCallback(
    (marker: AvailabilityData) => {
      return (
        <MapCard
          building={marker.building}
          space={selectedSpace}
          availability={marker.availability}
          startDate={sb.startDate}
          endDate={sb.endDate}
          style={{ width: "100%", maxWidth: 420, alignSelf: 'center' }}
        />
      );
    },
    [sb.startDate, sb.endDate, selectedSpace],
  );

  const onSearchRegion = useCallback(
    (region: Region) => {
      sb.setLocation({
        ...region,
        data: null,
        detail: null,
      });
    },
    [sb],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <SearchBar style={{ alignSelf: 'center', width: '90%', maxWidth: 500, }} />
      </View>
      <View style={[styles.map, { height: mapHeight }]}>
        <Suspense fallback={<LoadingSpinner />}>
          <AvailabilityMap
            location={sb.location}
            markers={markers}
            onSearchRegion={onSearchRegion}
            renderMarker={renderMarker}
            renderMarkerCard={renderMarkerCard}
            onMarkerSelected={setSelectedMarker}
          />
        </Suspense>
      </View>
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
      height: 72,
      paddingVertical: 4,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    map: {
      zIndex: -1,
    },
  });
