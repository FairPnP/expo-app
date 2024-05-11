import {useAppMode, useSearchAvailabilities, useSearchState} from '@/state';
import {
  HorizontalGroup,
  IconButton,
  ListView,
  LoadingSpinner,
  LogoWithName,
  Title,
} from '@/view/shared';
import {AppTheme, useTheme} from '@/view/theme';
import React, {useMemo} from 'react';
import {Image, Dimensions, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {SearchBar, SpaceListing} from '../components';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {toISODateUTC} from '@/utils';

export const ParkingHome = ({}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const sb = useSearchState();
  const {data: searchResults, isPending} = useSearchAvailabilities(
    sb.location
      ? {
          start_date: toISODateUTC(sb.startDate),
          end_date: toISODateUTC(sb.endDate),
          latitude: sb.location.latitude,
          longitude: sb.location.longitude,
          lat_delta: sb.location.latitudeDelta / 2,
          long_delta: sb.location.longitudeDelta / 2,
        }
      : undefined,
  );

  const onSwitchToHosting = () => {
    setAppMode('hosting');
  };

  const inset = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const usableHeight =
    Dimensions.get('window').height - inset.bottom - tabBarHeight - 100;
  const listingViewHeight = usableHeight - 84;

  const windowWidth = Dimensions.get('window').width;
  const renderSpace = ({item}: any) => {
    return <SpaceListing style={{marginVertical: 16}} availability={item} />;
  };

  const logoSize = Math.min(Math.round(windowWidth / 4), 140);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: usableHeight}}>
        {!sb.location ? (
          <View style={styles.noResults}>
            <LogoWithName size={logoSize} />
            <SearchBar
              style={{
                marginVertical: 32,
                alignSelf: 'center',
                width: '90%',
                maxWidth: 500,
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.topArea}>
              <SearchBar
                style={{alignSelf: 'center', width: '90%', maxWidth: 500}}
              />
            </View>
            <View
              style={{
                height: listingViewHeight,
                paddingHorizontal: 16,
              }}>
              {isPending ? (
                <LoadingSpinner />
              ) : (
                <ListView
                  data={searchResults?.availabilities}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={renderSpace}
                  emptyMessage="No spaces found"
                  scrollEnabled={true}
                />
              )}
            </View>
          </>
        )}
      </View>
      <View style={styles.bottomArea}>
        <Title style={{marginTop: 4}}>Looking to host?</Title>
        <IconButton
          icon="directions"
          text="Switch to Hosting"
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
      height: 84,
      paddingVertical: 16,
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
    noResults: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
