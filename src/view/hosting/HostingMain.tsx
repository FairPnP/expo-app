import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HostingNavigator} from './navigation/HostingNavigator';
import {addSharedStackScreens} from '../shared';
import {EditParkingSpaceScreen} from './stack/EditParkingSpaceScreen';
import {AddSpotScreen} from './stack/AddSpotScreen';
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
        name="AddSpot"
        component={AddSpotScreen}
        options={{
          headerTitle: 'Add Parking Space',
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
