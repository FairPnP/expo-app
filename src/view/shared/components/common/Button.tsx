import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {Text} from './Text';

export type ButtonProps = {
  text?: string;
  children?: React.ReactNode;
  onPress: () => void;
  style?: any;
  enabled?: boolean;
};

export const Button = ({
  text,
  children,
  onPress,
  style,
  enabled,
}: ButtonProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, enabled === false && styles.buttonDisabled]}
      disabled={enabled === false}>
      {text && <Text style={styles.text}>{text}</Text>}
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
    buttonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    text: {
      color: theme.colors.textButton,
      fontWeight: 'bold',
    },
  });
