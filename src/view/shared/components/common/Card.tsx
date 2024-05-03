import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppTheme, useTheme} from '@/view/theme';

export type CardProps = {
  style?: any;
  children?: React.ReactNode;
};

export const Card = ({style, children}: CardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return <View style={[styles.card, style]}>{children}</View>;
};

const getStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      padding: 10,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
  });
};
