import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {friendlyDateRange} from '@/utils';
import {useTheme, AppTheme} from '@/view/theme';
import {useBuildings, useMyReservations, useMySpaces} from '@/state';
import {Title, Text, Button} from '../common';
import {SpaceCard} from '../spaces';

export type ReservationDetailsScreenProps = {
  reservation_id: number;
};

export const ReservationDetailsScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {reservation_id} = route.params as ReservationDetailsScreenProps;
  const {reservationMap} = useMyReservations();
  const reservation = reservationMap?.[reservation_id];
  const {spaceMap} = useMySpaces();
  const {buildingMap} = useBuildings(Object.keys(spaceMap).map(Number));

  const space = spaceMap?.[reservation?.space_id];
  const building = buildingMap?.[space?.building_id];

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
