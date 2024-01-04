import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppTheme, Text, useTheme} from '@/common';
import {Reservation} from '../api';
import {useLoadSpaces} from '@/spaces';
import {useLoadAvailability} from '@/availability';

export type ReservationItemProps = {
  reservation: Reservation;
};

export const ReservationItem = ({reservation}: ReservationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {buildings, spaces} = useLoadSpaces();
  const {availabilities} = useLoadAvailability();

  const availability = useMemo(
    () => availabilities.find(a => a.id === reservation.availability_id),
    [availabilities, reservation.availability_id],
  );
  const space = useMemo(
    () => spaces.find(s => s.id === availability?.space_id),
    [spaces, availability?.space_id],
  );
  const building = useMemo(
    () => buildings.find(b => b.id === space?.building_id),
    [buildings, space?.building_id],
  );

  return (
    <View style={styles.container}>
      <Text>{building?.name}</Text>
      <Text>{space?.name}</Text>
      <Text>
        {`Start: ${reservation.start_date.toDateString()} - ${reservation.start_date
          .toTimeString()
          .substring(0, 5)}`}
      </Text>

      <Text>
        {`End:  ${reservation.end_date.toDateString()} - ${reservation.end_date
          .toTimeString()
          .substring(0, 5)}`}
      </Text>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
    },
  });
