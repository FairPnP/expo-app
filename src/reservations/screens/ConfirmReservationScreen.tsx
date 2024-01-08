import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {AppTheme, Button, Title, useTheme} from '@/common';
import {Building, LocationCard} from '@/buildings';
import {Space} from '@/spaces';
import {getAvailabilityCost} from '@/availability';
import {friendlyDateRange, toDateTimeString} from '@/utils';
import {ReservationAPI} from '../api';

export type ConfirmReservationScreenProps = {
  building: Building;
  space: Space;
  startTimestamp: number;
  endTimestamp: number;
  hourly_rate: number;
};

export const ConfirmReservationScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {building, space, startTimestamp, endTimestamp, hourly_rate} =
    route.params as ConfirmReservationScreenProps;

  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const onReservePressed = useCallback(async () => {
    const res = await ReservationAPI.create({
      space_id: space.id,
      start_date: startDate.toISOString().slice(0, 19),
      end_date: endDate.toISOString().slice(0, 19),
    });

    Alert.alert('Success', 'Reservation created.');
    navigation.navigate('Home');
  }, [startDate, endDate]);

  return (
    <ScrollView>
      <View style={styles.section}>
        <Title>Location</Title>
        <LocationCard
          mainText={building.name}
          secondaryText={space.name}
          lat={building.latitude.toString()}
          lng={building.longitude.toString()}
        />
      </View>

      <View style={styles.section}>
        <Title>Time</Title>
        <Text>Start: {toDateTimeString(startDate)}</Text>
        <Text>End: {toDateTimeString(endDate)}</Text>
        <Text>Total time: {friendlyDateRange(startDate, endDate)}</Text>
      </View>

      <View style={styles.section}>
        <Title>Cost</Title>
        <Text>Hourly rate: ${hourly_rate.toFixed(2)}</Text>
        <Text>
          Total cost: $
          {getAvailabilityCost(hourly_rate, startDate, endDate).toFixed(2)}
        </Text>
      </View>

      <View style={styles.bottomArea}>
        <Button onPress={onReservePressed}>
          <Text>Confirm Reservation</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    section: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    bottomArea: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
