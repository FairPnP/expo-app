import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ParkingNavigator} from './navigation/ParkingNavigator';
import {ReservationDetailsScreen} from './stack/ReservationDetailsScreen';
import {
  ReservationChatScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
} from '../shared';
import {ConfirmReservationScreen} from './stack/ConfirmReservationScreen';

const Stack = createNativeStackNavigator();

export const ParkingMain = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Navigator"
          component={ParkingNavigator}
          options={{
            headerShown: false,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
