import {StripeAPI} from '@/api';
import React, {useEffect} from 'react';
import {LoadingSpinner} from '@/view/shared';

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
