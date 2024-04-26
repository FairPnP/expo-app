import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HostingNavigator} from './navigation/HostingNavigator';
import {addSharedStackScreens} from '../shared';
import {EditListingScreen} from './stack/EditListingScreen';
import {AddListingAddressScreen} from './stack/AddListingAddressScreen';
import {ManageAvailabilityScreen} from './stack/ManageAvailabilityScreen';

const Stack = createNativeStackNavigator();

export const HostingMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name="Navigator"
        component={HostingNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddListingAddress"
        component={AddListingAddressScreen}
        options={{
          headerTitle: 'Listing Address',
        }}
      />
      <Stack.Screen
        name="EditListing"
        component={EditListingScreen}
        options={{
          headerTitle: 'Listing Details',
        }}
      />
      <Stack.Screen
        name="ManageAvailability"
        component={ManageAvailabilityScreen}
        options={{
          headerTitle: 'Manage Availability',
        }}
      />
      {addSharedStackScreens(Stack)}
    </Stack.Navigator>
  );
};
