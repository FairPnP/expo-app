import React from 'react';
import {Text as ReactText, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';

export type TextProps = {
  children: React.ReactNode;
  style?: any;
  numberOfLines?: number;
};

export const Text = ({children, style, numberOfLines}: TextProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <ReactText
      style={[styles.text, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail">
      {children}
    </ReactText>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });
