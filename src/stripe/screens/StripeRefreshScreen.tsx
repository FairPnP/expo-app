import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppTheme, useTheme} from '@/common';
import {StripeAPI} from '../api';

export const StripeRefreshScreen = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const stripeAccount = async () => {
    await StripeAPI.showDashboard();
  };
  useEffect(() => {
    stripeAccount();
    navigation.navigate('Profile');
  }, []);

  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator color={styles.spinner.color} />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    spinnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      color: theme.colors.primary,
    },
  });
