import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  AvailabilityDatePicker,
  LocationSearch,
  Title,
  Text,
} from '@/view/shared';
import {useTheme, AppTheme} from '@/view/theme';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useSearchBarState} from '@/state';

export type SearchBarState = {
  startDate: Date;
  endDate: Date;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type SearchBarProps = {
  onSubmit?: (state: SearchBarState) => void;
};

export const SearchBar = ({onSubmit}: SearchBarProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sb = useSearchBarState();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLocationSelected = (data: any, details: any) => {
    sb.setLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const onDateRangeSelected = (startDate: Date, endDate: Date) => {
    sb.setStartDate(startDate);
    sb.setEndDate(endDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.card}>
        <View style={styles.searchIcon}>
          <Icon name="magnify" size={32} color="#000" />
        </View>
        <View style={styles.infoArea}>
          <Title>Find Parking</Title>
          <Text>Enter location</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <Title style={{marginVertical: 12}}>Where?</Title>
        <LocationSearch onLocationSelected={onLocationSelected} />
        <Title style={{marginVertical: 12}}>When?</Title>
        <AvailabilityDatePicker onDateRangeSelected={onDateRangeSelected} />
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              toggleCollapse();
              if (onSubmit) {
                onSubmit({
                  location: sb.location,
                  startDate: sb.startDate,
                  endDate: sb.endDate,
                });
              }
            }}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 4,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    card: {
      padding: 4,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
    },
    searchIcon: {
      position: 'absolute',
      top: 11,
      left: 16,
    },
    infoArea: {
      paddingLeft: 48,
    },
    bottomArea: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });
