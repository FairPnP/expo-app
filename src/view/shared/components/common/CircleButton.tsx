import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';

export type CircleButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  size?: number;
  style?: any;
};

export const CircleButton = ({ children, onPress, style, size }: CircleButtonProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme, size || 30);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme, size: number) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size / 2,
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: size,
      height: size,
    },
  });
