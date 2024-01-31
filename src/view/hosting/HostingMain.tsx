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
import {AppTheme, useTheme} from '../theme';
import {AddSpotScreen} from './stack/AddSpotScreen';

const Stack = createNativeStackNavigator();

export const HostingMain = () => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

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
        name="ManageSpot"
        component={ManageSpotScreen}
        options={{
          headerTitle: 'Manage Parking',
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
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
