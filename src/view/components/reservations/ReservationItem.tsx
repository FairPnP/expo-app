import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {Reservation} from '@/api';
import {useBuildings, useMySpaces} from '@/state';
import {Text} from '../common';

export type ReservationItemProps = {
  reservation: Reservation;
};

export const ReservationItem = ({reservation}: ReservationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation() as any;
  const {spaceMap} = useMySpaces();
  const {buildingMap} = useBuildings(Object.keys(spaceMap).map(Number));

  const space = useMemo(
    () => spaceMap?.[reservation.space_id],
    [spaceMap, reservation.space_id],
  );
  const building = useMemo(
    () => buildingMap?.[space?.building_id],
    [buildingMap, space?.building_id],
  );

  const onPress = useCallback(() => {
    if (!reservation) {
      return;
    }
    navigation.navigate('ReservationDetails', {reservation_id: reservation.id});
  }, [reservation, navigation]);

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
