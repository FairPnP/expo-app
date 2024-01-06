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
import {StripeProvider} from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import {StripeRefreshScreen, StripeReturnScreen} from '@/stripe';

const prefix = Linking.createURL('/');

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

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        HomeStack: {
          screens: {
            Home: 'home',
            Profile: 'user',
          },
        },
        Stripe: {
          path: 'stripe',
          screens: {
            Return: 'return',
            Refresh: 'refresh',
          },
        },
      },
    },
  };

  return (
    <AmplifyThemeProvider
      theme={theme.amplifyTheme}
      colorMode={theme.appTheme.dark ? 'dark' : 'light'}>
      <Authenticator.Provider>
        <Authenticator>
          <RecoilRoot>
            <StripeProvider
              publishableKey="pk_test_51OPtRcEjtf5XGOQ8ilrOwXIYXeuCff1rPBUTW48QZxOVzFXtnyrBYDnNuhvrwUADoi1JsWa0nk4kua6z6KG3BaJd00GMLmWRvS"
              // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
              // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
              <SafeAreaView style={styles.container}>
                <NavigationContainer
                  theme={theme.appTheme}
                  linking={linking as any}>
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
                  </Stack.Navigator>
                </NavigationContainer>
              </SafeAreaView>
            </StripeProvider>
          </RecoilRoot>
        </Authenticator>
      </Authenticator.Provider>
    </AmplifyThemeProvider>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
