import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Amplify} from 'aws-amplify';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react-native';
import {RecoilRoot} from 'recoil';
import {TabNavigator} from './navigation';
import {AppTheme, useTheme} from '@/common';
import {EditParkingSpaceScreen, ManageSpotScreen} from './screens';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_rLEHzrY8g',
      userPoolClientId: '3tlsbjvp6doncm3pnt69ncgc9t',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
      },
      mfa: {
        status: 'off',
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
    // oauth: {
    //   domain: 'fairpnp-dev.auth.us-east-2.amazoncognito.com',
    //   scope: ['email', 'profile', 'openid'],
    //   redirectSignIn: 'fairpnp://',
    //   redirectSignOut: 'fairpnp://',
    //   responseType: 'code',
    //   googleClientId:
    //     '841374583718-9hj367s57cll8kft7pa3lihhj2ovub73.apps.googleusercontent.com',
    // },
  },
});

const Stack = createNativeStackNavigator();

export const MainScreen = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme.appTheme);

  return (
    <AmplifyThemeProvider
      theme={theme.amplifyTheme}
      colorMode={theme.appTheme.dark ? 'dark' : 'light'}>
      <Authenticator.Provider>
        <Authenticator>
          <RecoilRoot>
            <SafeAreaView style={styles.container}>
            <NavigationContainer theme={theme.appTheme}>
              <Stack.Navigator>
                <Stack.Screen
                  name="Navigator"
                  component={TabNavigator}
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
              </Stack.Navigator>
            </NavigationContainer>
            </SafeAreaView>
          </RecoilRoot>
        </Authenticator>
      </Authenticator.Provider>
    </AmplifyThemeProvider>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
