import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HostingNavigator} from './navigation/HostingNavigator';
import {
  ReservationChatScreen,
  ReservationDetailsScreen,
  SpaceReviewsScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
  UserReviewsScreen,
} from '../shared';
import {EditParkingSpaceScreen} from './stack/EditParkingSpaceScreen';
import {ViewSpotScreen} from '../shared/screens/ViewSpotScreen';
import {AddSpotScreen} from './stack/AddSpotScreen';
import {ManageSpotScreen} from './stack/ManageSpotScreen';

const Stack = createNativeStackNavigator();

export const HostingMain = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Navigator"
        component={HostingNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddSpot"
        component={AddSpotScreen}
        options={{
          headerTitle: 'Add Parking Space',
        }}
      />
      <Stack.Screen
        name="ViewSpot"
        component={ViewSpotScreen}
        options={{
          headerShown: false,
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
        name="ManageSpot"
        component={ManageSpotScreen}
        options={{
          headerTitle: 'Manage Parking Space',
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
