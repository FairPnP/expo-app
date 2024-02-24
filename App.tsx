import 'react-native-url-polyfill/auto';
import { polyfillWebCrypto } from 'expo-standard-web-crypto';
polyfillWebCrypto();
import { enableLatestRenderer } from 'react-native-maps';
enableLatestRenderer();

import * as React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { MainScreen } from '@/view/MainScreen';
import { ThemeProvider, useTheme } from '@/view/theme';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Sentry from 'sentry-expo';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { focusManager } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { AppModeProvider } from '@/state';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initNotifHandler, registerForPushNotificationsAsync } from '@/view/Notifications';
import * as Notifications from 'expo-notifications';

// sentry
Sentry.init({
  dsn: 'https://a54aeb03d5eb52cfd26eb17885590110@o4506571966906368.ingest.sentry.io/4506571968479232',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  patchGlobalPromise: false,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      shouldCreateSpanForRequest: url => {
        return !__DEV__ || !url.startsWith(`http://192.168`);
      },
    }),
  ],
});

// deep linking
const prefix = Linking.createURL('/');

// amplify
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
  },
});

// react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // axios already handles retries
      retry: false,
    },
  },
});
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

// notifications
initNotifHandler();

// app
function App() {
  const theme = useTheme().theme;
  const navigationRef = createNavigationContainerRef();

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Profile: 'profile',
        StripeReturn: 'stripe/return',
        StripeRefresh: 'stripe/refresh',
      },
    },
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();

    const notifListener = Notifications
      .addNotificationReceivedListener(notif => console.log('notification', notif))

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('notif response', response.notification.request.content);
      let data = response.notification.request.content.data;
      console.log('screen', data?.screen_name, 'navigationRef', navigationRef.isReady(), navigationRef.current);
      if (data?.screen_name && navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.current?.navigate(data.screen_name, data.screen_params);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notifListener)
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);


  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AmplifyThemeProvider
            theme={theme.amplifyTheme}
            colorMode={theme.appTheme.dark ? 'dark' : 'light'}>
            <Authenticator.Provider>
              <Authenticator>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <BottomSheetModalProvider>
                    <StripeProvider
                      publishableKey="pk_test_51OPtRcEjtf5XGOQ8ilrOwXIYXeuCff1rPBUTW48QZxOVzFXtnyrBYDnNuhvrwUADoi1JsWa0nk4kua6z6KG3BaJd00GMLmWRvS"
                      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                      merchantIdentifier="merchant.com.fairpnp.fairpnp">
                      <NavigationContainer
                        theme={theme.appTheme}
                        ref={navigationRef}
                        linking={linking}>
                        <AppModeProvider>
                          <MainScreen />
                        </AppModeProvider>
                      </NavigationContainer>
                      <Toast />
                    </StripeProvider>
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </Authenticator>
            </Authenticator.Provider>
          </AmplifyThemeProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
