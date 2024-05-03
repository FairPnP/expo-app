import {useAppMode, useSearchAvailabilities, useSearchState} from '@/state';
import {IconButton, ListView, LoadingSpinner, Title} from '@/view/shared';
import {AppTheme, useTheme} from '@/view/theme';
import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchBar, SpaceListing} from '../components';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {toISODateUTC} from '@/utils';

export const ParkingHome = ({}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const sb = useSearchState();
  const {data: searchResults, isPending} = useSearchAvailabilities({
    start_date: toISODateUTC(sb.startDate),
    end_date: toISODateUTC(sb.endDate),
    latitude: sb.location.latitude,
    longitude: sb.location.longitude,
    lat_delta: sb.location.latitudeDelta / 2,
    long_delta: sb.location.longitudeDelta / 2,
  });

  const onSwitchToHosting = () => {
    setAppMode('hosting');
  };

  const inset = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const listingViewHeight =
    Dimensions.get('window').height -
    inset.bottom -
    tabBarHeight -
    72 -
    100 -
    4;

  const windowWidth = Dimensions.get('window').width;
  const maxWidth = listingViewHeight * 0.7;
  const hPadding = Math.max(16, (windowWidth - maxWidth) / 2);
  const listingWidth = windowWidth - hPadding * 2;
  const renderSpace = ({item}: any) => {
    return (
      <SpaceListing
        style={{marginVertical: 16}}
        availability={item}
        width={listingWidth}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <SearchBar style={{alignSelf: 'center', width: '90%', maxWidth: 500}} />
      </View>
      <View
        style={{
          paddingHorizontal: hPadding,
          height: listingViewHeight,
        }}>
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <ListView
            key={listingWidth}
            data={searchResults.availabilities}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={renderSpace}
            emptyMessage="No spaces found"
            scrollEnabled={true}
          />
        )}
      </View>
      <View style={styles.bottomArea}>
        <Title style={{marginVertical: 4}}>Manage your listings</Title>
        <IconButton
          icon="directions"
          text="Switch to Hosting Mode"
          onPress={onSwitchToHosting}
        />
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
    topArea: {
      zIndex: 1,
      height: 72,
      paddingVertical: 4,
      backgroundColor: theme.colors.background,
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    bottomArea: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
