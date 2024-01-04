import * as React from 'react';

import {MainScreen} from './src/view/components/MainScreen';
import {ThemeProvider} from './src/common/themes';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

console.log('App.tsx');

export default function App() {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}
