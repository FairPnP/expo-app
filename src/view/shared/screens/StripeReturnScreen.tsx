import { Alert, View } from 'react-native';
import React, { useEffect } from 'react';
import { LoadingOverlay } from '../components';
import { useMerchantAccount, useValidateMerchant } from '@/state';
import * as WebBrowser from 'expo-web-browser';

export const StripeReturnScreen = ({ navigation }) => {
  const { data, isPending } = useValidateMerchant();
  const { invalidateCache } = useMerchantAccount();

  useEffect(() => {
    WebBrowser.dismissBrowser();
  }, []);

  useEffect(() => {
    if (data && !isPending) {
      if (data.isValid) {
        Alert.alert('Success', 'Stripe account created.');
        invalidateCache();
      }
      navigation.navigate('Profile');
    }
  }, [data, isPending]);

  return (
    <View style={{ flex: 1 }}>
      <LoadingOverlay visible={isPending} />
    </View>
  );
};
