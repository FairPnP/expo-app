import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {AppTheme, useTheme, Title} from '@/common';
import {AvailabilityDatePicker, MapsSearch} from '@/availability';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBarState, searchBarState} from '../state';
import {useRecoilState} from 'recoil';

export type SearchBarProps = {
  onSubmit?: (state: SearchBarState) => void;
};

export const SearchBar = ({onSubmit}: SearchBarProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [state, setState] = useRecoilState(searchBarState);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const onLocationSelected = (data: any, details: any) => {
    setState({
      ...state,
      location: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      },
    });
  };

  const onDateRangeSelected = (startDate: Date, endDate: Date) => {
    setState({
      ...state,
      startDate,
      endDate,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse} style={styles.card}>
        <View style={styles.searchIcon}>
          <Icon name="magnify" size={32} color="#000" />
        </View>
        <View style={styles.infoArea}>
          <Title>Find Parking</Title>
          <Text> Enter location</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <MapsSearch onLocationSelected={onLocationSelected} />
        <AvailabilityDatePicker onDateRangeSelected={onDateRangeSelected} />
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              toggleCollapse();
              if (onSubmit) {
                onSubmit(state);
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
      top: 16,
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
