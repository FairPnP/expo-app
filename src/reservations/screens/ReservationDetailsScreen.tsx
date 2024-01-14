import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {AppTheme, Button, Text, Title, useTheme} from '@/common';
import {SpaceCard, useLoadSpaces} from '@/spaces';
import {friendlyDateRange} from '@/utils';
import {useLoadReservations} from '../hooks';

export type ReservationDetailsScreenProps = {
  reservation_id: number;
};

export const ReservationDetailsScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {reservation_id} = route.params as ReservationDetailsScreenProps;
  const {reservations} = useLoadReservations();
  const reservation = reservations.find(r => r.id === reservation_id);
  const {buildings, spaces} = useLoadSpaces();

  const space = spaces.find(s => s.id === reservation.space_id);
  const building = buildings.find(b => b.id === space.building_id);

  const onChatButtonPressed = () => {
    navigation.navigate('ReservationChat', {reservation_id: reservation.id});
  };

  return (
    <ScrollView>
      <View style={styles.section}>
        <Title>Reservation</Title>
        <SpaceCard building={building} space={space} />
        <Text>
          {friendlyDateRange(reservation.start_date, reservation.end_date)}
        </Text>
      </View>
      <View style={styles.bottomArea}>
        <Button onPress={onChatButtonPressed}>
          <Text>Message Host</Text>
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
    spacer: {
      height: 16,
    },
    bottomArea: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
