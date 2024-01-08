import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppTheme, useTheme} from '@/common';
import {StripeAPI} from '../api';

export const StripeReturnScreen = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const validateStripeAccount = async () => {
    await StripeAPI.validateAccount();
    Alert.alert('Success', 'Stripe account created.');
    navigation.navigate('Profile');
  };

  useEffect(() => {
    validateStripeAccount();
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
