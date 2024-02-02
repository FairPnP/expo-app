import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HostingNavigator} from './navigation/HostingNavigator';
import {
  ReservationChatScreen,
  SpaceReviewsScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
} from '../shared';
import {EditParkingSpaceScreen} from './stack/EditParkingSpaceScreen';
import {ViewSpotScreen} from './stack/ViewSpotScreen';
import {AddSpotScreen} from './stack/AddSpotScreen';

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
    </Stack.Navigator>
  );
};
