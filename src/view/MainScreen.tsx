import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './navigation';
import {AppTheme, useTheme} from '@/common';
import {EditParkingSpaceScreen, ManageSpotScreen} from './screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import * as Linking from 'expo-linking';
import {StripeRefreshScreen, StripeReturnScreen} from '@/stripe';
import {
  ConfirmReservationScreen,
  ReservationChatScreen,
  ReservationDetailsScreen,
} from '@/reservations';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

export const MainScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme.appTheme);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Profile: 'profile',
        StripeReturn: 'stripe/return',
        StripeRefresh: 'stripe/refresh',
      },
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer theme={theme.appTheme} linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Navigator"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ManageSpot"
            component={ManageSpotScreen}
            options={{
              headerTitle: 'Manage Parking Spot',
            }}
          />
          <Stack.Screen
            name="EditParkingSpace"
            component={EditParkingSpaceScreen}
            options={{
              headerTitle: 'Edit Parking Space',
            }}
          />
          <Stack.Screen
            name="ConfirmReservation"
            component={ConfirmReservationScreen}
            options={{
              headerTitle: 'Confirm Reservation',
            }}
          />
          <Stack.Screen
            name="StripeReturn"
            component={StripeReturnScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StripeRefresh"
            component={StripeRefreshScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReservationDetails"
            component={ReservationDetailsScreen}
            options={{
              headerTitle: 'Reservation Details',
            }}
          />
          <Stack.Screen
            name="ReservationChat"
            component={ReservationChatScreen}
            options={{
              headerTitle: 'Chat',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
