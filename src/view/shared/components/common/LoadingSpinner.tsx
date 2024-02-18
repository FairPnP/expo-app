import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { AppTheme, useTheme } from '@/view/theme';

export type LoadingSpinnerProps = {
  style?: any;
};

export const LoadingSpinner = ({ style }: LoadingSpinnerProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={[styles.spinnerContainer, style]}>
      <ActivityIndicator color={styles.spinner.color} size="large" />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    spinnerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      color: theme.colors.primary,
    },
  });
