import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {friendlyDateRange, toDateTimeString, toISODateUTC} from '@/utils';
import {useStripe} from '@stripe/stripe-react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space, StripePaymentsAPI} from '@/api';
import {
  Button,
  LocationCard,
  SpaceCard,
  Title,
  Text,
  LoadingOverlay,
} from '@/view/shared';
import {useCreateReservation} from '@/state';

export type ConfirmReservationScreenProps = {
  building: Building;
  space: Space;
  startTimestamp: number;
  endTimestamp: number;
  price: number;
};

export const ConfirmReservationScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const {mutateAsync: createReservation, isPending} = useCreateReservation();

  const {building, space, startTimestamp, endTimestamp, price} =
    route.params as ConfirmReservationScreenProps;

  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const handleReservation = useCallback(async () => {
    await createReservation({
      space_id: space.id,
      start_date: toISODateUTC(startDate),
      end_date: toISODateUTC(endDate),
    });

    Alert.alert('Success', 'Reservation created.');
    navigation.navigate('Home');
  }, [startDate, endDate]);

  const fetchPaymentSheetParams = async () =>
    await StripePaymentsAPI.createPaymentIntent({
      amount: price * 100,
    });

  const initializePaymentSheet = async () => {
    const params = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Fair Park And Pay Ltd.',
      customerId: params.customer_id,
      customerEphemeralKeySecret: params.ephemeral_key,
      paymentIntentClientSecret: params.client_secret,
    });

    if (error) {
      console.error('Error initializing payment sheet', error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      console.error('Error processing payment', error);
    } else {
      await handleReservation();
    }
  };

  return (
    <ScrollView>
      <LoadingOverlay visible={isPending} />
      <View style={styles.section}>
        <Title>Location</Title>
        <SpaceCard space={space} building={building} />
        <View style={styles.spacer} />
        <LocationCard
          mainText={building.name}
          secondaryText={space.name}
          lat={building.latitude}
          lng={building.longitude}
        />
      </View>

      <View style={styles.section}>
        <Title>Time</Title>
        <Text>Start: {toDateTimeString(startDate)}</Text>
        <Text>End: {toDateTimeString(endDate)}</Text>
        <Text>Total time: {friendlyDateRange(startDate, endDate)}</Text>
      </View>

      <View style={styles.section}>
        <Text>Price: ${price.toFixed(2)}</Text>
      </View>

      <View style={styles.bottomArea}>
        <Button
          text="Confirm Reservation"
          style={{marginRight: 8}}
          onPress={openPaymentSheet}
        />
        <Button text="*Bypass Purchase*" onPress={handleReservation} />
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
