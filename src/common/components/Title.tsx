import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '../themes';

export type TitleProps = {
  children: React.ReactNode;
  style?: any;
};

export const Title = ({children, style}: TitleProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });
