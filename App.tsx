import * as React from 'react';

import {MainScreen} from './src/view/components';
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
