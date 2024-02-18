import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { friendlyDateRange, toDateTimeString } from '@/utils';
import { useStripe } from '@stripe/stripe-react-native';
import { useTheme, AppTheme } from '@/view/theme';
import { Building, Space, StripeAPI, getAvailabilityCost } from '@/api';
import { Button, LocationCard, SpaceCard, Title, Text, LoadingOverlay } from '@/view/shared';
import { useCreateReservation } from '@/state';

export type ConfirmReservationScreenProps = {
  building: Building;
  space: Space;
  startTimestamp: number;
  endTimestamp: number;
  hourly_rate: number;
};

export const ConfirmReservationScreen = ({ navigation, route }) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { mutateAsync: createReservation, isPending } = useCreateReservation();

  const { building, space, startTimestamp, endTimestamp, hourly_rate } =
    route.params as ConfirmReservationScreenProps;

  const startDate = new Date(startTimestamp);
  const endDate = new Date(endTimestamp);

  const handleReservation = useCallback(async () => {
    await createReservation({
      space_id: space.id,
      start_date: startDate.toISOString().slice(0, 19),
      end_date: endDate.toISOString().slice(0, 19),
    });

    Alert.alert('Success', 'Reservation created.');
    navigation.navigate('Home');
  }, [startDate, endDate]);

  const fetchPaymentSheetParams = async () =>
    await StripeAPI.createPaymentIntent({
      dest_account: 'acct_1OVZgSIdfTCpbyKQ',
      amount: getAvailabilityCost(hourly_rate, startDate, endDate) * 100,
    });

  const initializePaymentSheet = async () => {
    const params = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
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
    const { error } = await presentPaymentSheet();

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
        <Title>Cost</Title>
        <Text>Hourly rate: ${hourly_rate.toFixed(2)}</Text>
        <Text>
          Total cost: $
          {getAvailabilityCost(hourly_rate, startDate, endDate).toFixed(2)}
        </Text>
      </View>

      <View style={styles.bottomArea}>
        <Button style={{ marginRight: 8 }} onPress={openPaymentSheet}>
          <Text>Confirm Reservation</Text>
        </Button>
        <Button onPress={handleReservation}>
          <Text>*Bypass Purchase*</Text>
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
