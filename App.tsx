import 'react-native-url-polyfill/auto';
import {polyfillWebCrypto} from 'expo-standard-web-crypto';

polyfillWebCrypto();

import * as React from 'react';
import {MainScreen} from './src/view/MainScreen';
import {enableLatestRenderer} from 'react-native-maps';

import {RecoilRoot} from 'recoil';
import {StripeProvider} from '@stripe/stripe-react-native';
import {
  Authenticator,
  ThemeProvider as AmplifyThemeProvider,
} from '@aws-amplify/ui-react-native';
import {Amplify} from 'aws-amplify';
import {ThemeProvider, useTheme} from '@/common/themes/themeContext';

enableLatestRenderer();

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

export default function App() {
  const theme = useTheme().theme;
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
                <MainScreen />
              </StripeProvider>
            </RecoilRoot>
          </Authenticator>
        </Authenticator.Provider>
      </AmplifyThemeProvider>
    </ThemeProvider>
  );
}
