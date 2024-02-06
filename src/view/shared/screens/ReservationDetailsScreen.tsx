import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {friendlyDateRange} from '@/utils';
import {useTheme, AppTheme} from '@/view/theme';
import {useAppMode, useBuilding, useReservation, useSpace} from '@/state';
import {Title, Text, Button, LoadingSpinner, SpaceCard} from '@/view/shared';

export type ReservationDetailsScreenProps = {
  reservation_id: number;
};

export const ReservationDetailsScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {appMode} = useAppMode();

  const {reservation_id} = route.params as ReservationDetailsScreenProps;
  const {data: reservation} = useReservation(reservation_id);
  const {data: space} = useSpace(reservation?.space_id);
  const {data: building} = useBuilding(space?.building_id);

  const onChatButtonPressed = () => {
    if (!reservation) {
      return;
    }
    navigation.navigate('ReservationChat', {reservation_id: reservation?.id});
  };

  if (!reservation || !space || !building) {
    return <LoadingSpinner />;
  }

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
          <Text>Message {appMode === 'hosting' ? 'Guest' : 'Host'}</Text>
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
