import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HostingNavigator } from './navigation/HostingNavigator';
import { addSharedStackScreens } from '../shared';
import { EditParkingSpaceScreen } from './stack/EditParkingSpaceScreen';
import { AddSpotScreen } from './stack/AddSpotScreen';
import { ManageSpotScreen } from './stack/ManageSpotScreen';

const Stack = createNativeStackNavigator();

export const HostingMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
      }}
    >
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
        name="ManageSpot"
        component={ManageSpotScreen}
        options={{
          headerTitle: 'Manage Parking Space',
        }}
      />
      {addSharedStackScreens(Stack)}
    </Stack.Navigator>
  );
};
