import {Theme as AmplifyTheme} from '@aws-amplify/ui-react-native';
import {AppTheme} from '.';

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: '#33abf5', // Keeping the primary color similar
    background: '#303030', // Dark but not too dark for the background
    card: '#424242', // Slightly lighter than background for distinction
    text: '#E0E0E0', // Light color for text for readability
    border: '#616161', // Visible border color on dark background
    notification: '#4DB6AC', // Keeping it similar to the light theme
    shadow: '#000000', // Shadow can remain black
    error: '#FF8A80', // Adjusted for better visibility on dark background
    disabled: '#757575', // Visible yet distinct for disabled elements
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
            secondary: '#BDBDBD',
            tertiary: '#A4A4A4',
          },
          background: {
            primary: darkTheme.colors.background,
            secondary: darkTheme.colors.card,
            tertiary: '#525252',
          },
          border: {
            primary: darkTheme.colors.border,
            secondary: '#757575',
            tertiary: '#8D8D8D',
          },
        },
      },
    },
  ],
};
