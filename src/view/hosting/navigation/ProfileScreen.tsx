import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {StripeAPI} from '@/api';
import {useQueryClient} from '@tanstack/react-query';
import {useAppMode, useAuth} from '@/state';
import {IconButton} from '@/view/shared';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const {tokens} = useAuth();
  const email = tokens?.idToken?.payload.email?.toString();
  const userId = tokens?.idToken?.payload.sub;

  const {signOut} = useAuthenticator(context => [context.user]);
  const queryClient = useQueryClient();

  const {theme, toggleTheme} = useTheme();
  const styles = getStyles(theme.appTheme);
  const {setAppMode} = useAppMode();

  const onSwitchToParking = () => {
    setAppMode('parking');
  };

  const [stripeAccountId, setStripeAccountId] = useState<String>(null);

  const getStripeAccount = async () => {
    let res = await StripeAPI.getAccount({
      404: () => null,
    });

    if (res) {
      setStripeAccountId(res.account_id);
    }
  };

  useEffect(() => {
    getStripeAccount();
  }, []);

  const stripeAccountPressed = async () => {
    await StripeAPI.showDashboard();
  };

  const onSignOut = () => {
    queryClient.clear();
    signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <IconButton icon="tv" text="Toggle Theme" onPress={toggleTheme} />
      <IconButton icon="cog" text="Settings" onPress={() => {}} />
      <IconButton
        icon="cc-stripe"
        text="Stripe Account"
        onPress={stripeAccountPressed}
      />
      <IconButton
        icon="directions"
        text="Switch to Parking"
        onPress={onSwitchToParking}
      />
      <IconButton icon="sign-out-alt" text="Sign Out" onPress={onSignOut} />
    </SafeAreaView>
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
  });
