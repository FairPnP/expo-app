import 'react-native-url-polyfill/auto';
import {polyfillWebCrypto} from 'expo-standard-web-crypto';
polyfillWebCrypto();
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();

import * as React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react-native';
import {Amplify} from 'aws-amplify';
import {MainScreen} from '@/view/MainScreen';
import {ThemeProvider, useTheme} from '@/view/theme';
import {NavigationContainer} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Sentry from 'sentry-expo';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import type {AppStateStatus} from 'react-native';
import {focusManager} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {AppModeProvider} from '@/state';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

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

// app
function App() {
  const theme = useTheme().theme;

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

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <AmplifyThemeProvider
            theme={theme.amplifyTheme}
            colorMode={theme.appTheme.dark ? 'dark' : 'light'}>
            <Authenticator.Provider>
              <Authenticator>
                <QueryClientProvider client={queryClient}>
                  <StripeProvider
                    publishableKey="pk_test_51OPtRcEjtf5XGOQ8ilrOwXIYXeuCff1rPBUTW48QZxOVzFXtnyrBYDnNuhvrwUADoi1JsWa0nk4kua6z6KG3BaJd00GMLmWRvS"
                    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                    merchantIdentifier="merchant.com.fairpnp.fairpnp">
                    <NavigationContainer
                      theme={theme.appTheme}
                      linking={linking}>
                      <AppModeProvider>
                        <MainScreen />
                      </AppModeProvider>
                    </NavigationContainer>
                    <Toast />
                  </StripeProvider>
                </QueryClientProvider>
              </Authenticator>
            </Authenticator.Provider>
          </AmplifyThemeProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
