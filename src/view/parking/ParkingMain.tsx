import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParkingNavigator } from './navigation/ParkingNavigator';
import { addSharedStackScreens } from '../shared';
import { ConfirmReservationScreen } from './stack/ConfirmReservationScreen';

const Stack = createNativeStackNavigator();

export const ParkingMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
      }}
    >
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
      {addSharedStackScreens(Stack)}
    </Stack.Navigator >
  );
};
