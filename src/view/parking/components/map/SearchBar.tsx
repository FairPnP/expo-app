import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  AvailabilityDatePicker,
  LocationSearch,
  Title,
  Text,
  HorizontalGroup,
} from '@/view/shared';
import {useTheme, AppTheme} from '@/view/theme';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useSearchState} from '@/state';
import {toMinimalDateRange} from '@/utils';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

export type SearchBarState = {
  startDate: Date;
  endDate: Date;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
};

export type SearchBarProps = {};

export const SearchBar = ({}: SearchBarProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const sb = useSearchState();

  const toggleCollapse = () => {
    sb.setCollapse(!sb.isCollapsed);
  };

  const onLocationSelected = (
    data: GooglePlaceData,
    detail: GooglePlaceDetail,
  ) => {
    sb.setLocation({
      latitude: detail.geometry.location.lat,
      longitude: detail.geometry.location.lng,
      data,
      detail,
    });
  };

  const onDateRangeSelected = (startDate: Date, endDate: Date) => {
    if (!sb.isCollapsed) {
      sb.setStartDate(startDate);
      sb.setEndDate(endDate);
    }
  };

  let locationName = null;
  if (sb.location?.data?.description) {
    locationName = sb.location.data.description;
    const parts = sb.location.data.description.split(',');
    if (parts.length > 1) {
      locationName = parts[0] + ', ' + parts[1];
    }
  } else if (sb.location && sb.location.latitude && sb.location.longitude) {
    locationName = 'Map Area';
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.card}>
        <View style={styles.searchIcon}>
          <Icon name="magnify" size={32} color="#000" />
        </View>
        <View style={styles.infoArea}>
          {locationName && sb.startDate && sb.endDate ? (
            <>
              <Text style={{fontWeight: 'bold'}}>{locationName}</Text>
              <Text>{toMinimalDateRange(sb.startDate, sb.endDate)}</Text>
            </>
          ) : (
            <>
              <Title>Find Parking</Title>
              <Text>Enter location</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
      <Collapsible
        key={'collapse_' + sb.isCollapsed}
        collapsed={sb.isCollapsed}>
        <HorizontalGroup>
          <Title style={{marginVertical: 12}}>Where?</Title>
        </HorizontalGroup>
        <LocationSearch onLocationSelected={onLocationSelected} />
        <HorizontalGroup style={{justifyContent: 'flex-start'}}>
          <Title style={{marginVertical: 12, marginRight: 16}}>When?</Title>
          <Text>
            {sb.startDate &&
              sb.endDate &&
              toMinimalDateRange(sb.startDate, sb.endDate)}
          </Text>
        </HorizontalGroup>
        <AvailabilityDatePicker onDateRangeSelected={onDateRangeSelected} />
      </Collapsible>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 2,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    card: {
      padding: 4,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    searchIcon: {
      position: 'absolute',
      top: 11,
      left: 16,
    },
    infoArea: {
      paddingLeft: 48,
    },
  });
