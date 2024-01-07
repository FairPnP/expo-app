import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {AppTheme, useTheme, useAccessToken, isHttpError} from '@/common';
import * as WebBrowser from 'expo-web-browser';
import {StripeAPI} from '@/stripe';

export const ProfileScreen = () => {
  const tokens = useAccessToken();
  const email = tokens?.idToken?.payload.email?.toString();
  const userId = tokens?.idToken?.payload.sub;

  const {signOut} = useAuthenticator(context => [context.user]);

  const {theme, toggleTheme} = useTheme();
  const styles = getStyles(theme.appTheme);

  const [stripeAccountId, setStripeAccountId] = useState<String>(null);

  const getStripeAccount = async () => {
    let res = await StripeAPI.getAccount();

    if (!isHttpError(res)) {
      setStripeAccountId(res?.account_id);
    }
  };

  useEffect(() => {
    getStripeAccount();
  }, []);

  const stripeAccount = async () => {
    let res = await StripeAPI.dashboard();
    console.log(res);
    if (!isHttpError(res)) {
      let result = await WebBrowser.openBrowserAsync(res.link);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.userid}>{userId}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Stripe ID:</Text>
        <Text style={styles.userid}>{stripeAccountId}</Text>
      </View>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Icon
          name="theme-light-dark"
          size={24}
          color={theme.appTheme.colors.text}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Icon name="cog" size={24} color="#6e6e6e" style={styles.icon} />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={stripeAccount}>
        <Icon
          name="credit-card"
          size={24}
          color="#6e6e6e"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Stripe Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Icon name="logout" size={24} color="#6e6e6e" style={styles.icon} />
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text,
      paddingRight: 10,
    },
    userid: {
      fontSize: 14,
      color: theme.colors.text,
    },
    email: {
      fontSize: 18,
      color: theme.colors.text,
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      width: '100%',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      width: '100%',
      backgroundColor: theme.colors.card,
    },
    buttonText: {
      fontSize: 20,
      color: theme.colors.text,
    },
    icon: {
      width: 28,
      color: theme.colors.text,
    },
  });
