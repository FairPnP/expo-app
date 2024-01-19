import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import {StripeAPI} from '@/api';
import {LoadingSpinner} from '../common';

export const StripeReturnScreen = ({navigation}) => {
  const validateStripeAccount = async () => {
    await StripeAPI.validateAccount();
    Alert.alert('Success', 'Stripe account created.');
    navigation.navigate('Profile');
  };

  useEffect(() => {
    validateStripeAccount();
  }, []);

  return <LoadingSpinner />;
};
