import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';

export type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
};

export const Button = ({children, onPress, style}: ButtonProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
