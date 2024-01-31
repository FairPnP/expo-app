import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useAppMode, useAuth} from '@/state';
import {useTheme, AppTheme} from '@/view/theme';
import {FontAwesome5} from '@expo/vector-icons';
import {IconButton} from '@/view/shared';
import {Icon} from '@aws-amplify/ui-react-native/dist/primitives';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ProfileScreen = () => {
  const {tokens, userId, signOut} = useAuth();
  const email = tokens?.idToken?.payload.email?.toString();

  const {theme, toggleTheme} = useTheme();
  const styles = getStyles(theme.appTheme);
  const {setAppMode} = useAppMode();

  const onSwitchToHosting = () => {
    setAppMode('hosting');
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

      <View style={styles.separator} />

      <IconButton icon="tv" text="Toggle Theme" onPress={toggleTheme} />
      <IconButton icon="cog" text="Settings" onPress={() => {}} />
      <IconButton
        icon="directions"
        text="Switch to Hosting"
        onPress={onSwitchToHosting}
      />
      <IconButton icon="sign-out-alt" text="Sign Out" onPress={signOut} />
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
