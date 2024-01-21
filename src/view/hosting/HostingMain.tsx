import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {HostingNavigator} from './navigation/HostingNavigator';
import {
  ReservationChatScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
} from '../shared';
import {EditParkingSpaceScreen} from './stack/EditParkingSpaceScreen';
import {ManageSpotScreen} from './stack/ManageSpotScreen';

const Stack = createNativeStackNavigator();

export const HostingMain = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Navigator"
          component={HostingNavigator}
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
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
