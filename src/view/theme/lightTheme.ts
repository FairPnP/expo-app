import {Theme} from '@aws-amplify/ui-react-native';
import {AppTheme} from '.';

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    primary: '#33abf5',
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#212121',
    border: '#CDCDCD',
    notification: '#4DB6AC',
    shadow: '#000000',
    error: '#E57373',
    disabled: '#DDDDDD',
    textButton: '#FFFFFF',
  },
};

export const lightAmplifyTheme: Theme = {
  overrides: [
    {
      colorMode: 'light',
      tokens: {
        colors: {
          font: {
            primary: lightTheme.colors.text,
            secondary: '#757575',
            tertiary: '#616161',
          },
          background: {
            primary: lightTheme.colors.background,
            secondary: lightTheme.colors.card,
            tertiary: '#EEEEEE',
          },
          border: {
            primary: lightTheme.colors.border,
            secondary: '#A4A4A4',
            tertiary: '#8D8D8D',
          },
        },
      },
    },
  ],
};
