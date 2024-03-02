import { StripeAccountsAPI } from '@/api';
import React, { useEffect } from 'react';
import { LoadingSpinner } from '../components';
import * as WebBrowser from 'expo-web-browser';

export const StripeRefreshScreen = ({ navigation }) => {
  const stripeAccount = async () => {
    await StripeAccountsAPI.showDashboard();
  };
  useEffect(() => {
    WebBrowser.dismissBrowser();

    stripeAccount();
    navigation.navigate('Profile');
  }, []);

  return <LoadingSpinner />;
};
