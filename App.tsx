import 'react-native-url-polyfill/auto';
import {polyfillWebCrypto} from 'expo-standard-web-crypto';
polyfillWebCrypto();
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();

import * as React from 'react';
import {MainScreen} from './src/view/MainScreen';
import {RecoilRoot} from 'recoil';
import {StripeProvider} from '@stripe/stripe-react-native';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react-native';
import {Amplify} from 'aws-amplify';
import {ThemeProvider, useTheme} from '@/common/themes/themeContext';
import {NavigationContainer} from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Sentry from 'sentry-expo';

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
  },
});

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

  return (
    <ThemeProvider>
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
                <NavigationContainer theme={theme.appTheme} linking={linking}>
                  <MainScreen />
                </NavigationContainer>
              </StripeProvider>
            </RecoilRoot>
          </Authenticator>
        </Authenticator.Provider>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}

export default App;
