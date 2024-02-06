import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParkingNavigator} from './navigation/ParkingNavigator';
import {
  ReservationChatScreen,
  SpaceReviewsScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
  UserReviewsScreen,
  ReservationDetailsScreen,
} from '../shared';
import {ConfirmReservationScreen} from './stack/ConfirmReservationScreen';

const Stack = createNativeStackNavigator();

export const ParkingMain = () => {
  return (
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
      <Stack.Screen
        name="SpaceReviews"
        component={SpaceReviewsScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="UserReviews"
        component={UserReviewsScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};
