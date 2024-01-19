import {Theme as AmplifyTheme} from '@aws-amplify/ui-react-native';
import {AppTheme} from '.';

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: '#4CAF50',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#373737',
    notification: '#8BC34A',
    shadow: '#000000',
    error: '#CF6679',
    disabled: '#616161',
  },
};

export const darkAmplifyTheme: AmplifyTheme = {
  overrides: [
    {
      colorMode: 'dark',
      tokens: {
        colors: {
          font: {
            primary: darkTheme.colors.text,
            secondary: '#BBBBBB',
            tertiary: '#999999',
          },
          background: {
            primary: darkTheme.colors.background,
            secondary: darkTheme.colors.card,
            tertiary: '#373737',
          },
          border: {
            primary: darkTheme.colors.border,
            secondary: '#525252',
            tertiary: '#707070',
          },
        },
      },
    },
  ],
};
