// TextComponent.js
import React from 'react';
import {Text as ReactText, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '../../theme';

export type TextProps = {
  children: React.ReactNode;
  style?: any;
};

export const Text = ({children, style}: TextProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return <ReactText style={[styles.text, style]}>{children}</ReactText>;
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });
