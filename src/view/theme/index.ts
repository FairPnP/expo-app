export * from './themeContext';

// src/themes/themeTypes.ts
import { Theme as AmplifyTheme } from '@aws-amplify/ui-react-native';
import { StatusBar } from 'react-native';

export interface AppTheme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    shadow: string;
    error: string;
    disabled: string;
  };
}

export interface Theme {
  appTheme: AppTheme;
  amplifyTheme: AmplifyTheme;
}

export function setStatusBar(theme: AppTheme) {
  StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
}
