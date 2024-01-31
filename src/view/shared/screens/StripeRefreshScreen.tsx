import {StripeAPI} from '@/api';
import React, {useEffect} from 'react';
import {LoadingSpinner} from '../components';

export const StripeRefreshScreen = ({navigation}) => {
  const stripeAccount = async () => {
    await StripeAPI.showDashboard();
  };
  useEffect(() => {
    stripeAccount();
    navigation.navigate('Profile');
  }, []);

  return <LoadingSpinner />;
};
