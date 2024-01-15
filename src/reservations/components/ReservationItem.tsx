import React, {useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppTheme, Text, useTheme} from '@/common';
import {Reservation} from '../api';
import {useLoadSpaces} from '@/spaces';
import {useNavigation} from '@react-navigation/native';

export type ReservationItemProps = {
  reservation: Reservation;
};

export const ReservationItem = ({reservation}: ReservationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation() as any;
  const {spaces, buildings} = useLoadSpaces();

  const space = useMemo(
    () => spaces.find(s => s.id === reservation?.space_id),
    [spaces, reservation?.space_id],
  );
  const building = useMemo(
    () => buildings.find(b => b.id === space?.building_id),
    [buildings, space?.building_id],
  );

  const onPress = () => {
    navigation.navigate('ReservationDetails', {reservation_id: reservation.id});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
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
      </TouchableOpacity>
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
