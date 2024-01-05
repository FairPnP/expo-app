import 'react-native-url-polyfill/auto';
import {polyfillWebCrypto} from 'expo-standard-web-crypto';

polyfillWebCrypto();

import * as React from 'react';
import {MainScreen} from './src/view/components/MainScreen';
import {ThemeProvider} from './src/common/themes';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

export default function App() {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}
