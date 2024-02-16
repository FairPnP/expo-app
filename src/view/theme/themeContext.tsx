// src/themes/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { darkTheme, darkAmplifyTheme } from './darkTheme';
import { lightTheme, lightAmplifyTheme } from './lightTheme';
import { Theme, AppTheme } from '.';
import { StatusBar } from 'react-native';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: { appTheme: lightTheme, amplifyTheme: lightAmplifyTheme },
  toggleTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(lightTheme);

  const toggleTheme = () => {
    const newTheme = currentTheme.dark ? lightTheme : darkTheme;
    setCurrentTheme(newTheme)
    StatusBar.setBarStyle(newTheme.dark ? 'light-content' : 'dark-content');
  };

  const theme: Theme = {
    appTheme: currentTheme,
    amplifyTheme: currentTheme.dark ? darkAmplifyTheme : lightAmplifyTheme,
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
