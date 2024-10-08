import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {StripeAccountsAPI} from '@/api';
import {useAppMode, useAuth, useMerchantAccount, useUserSummary} from '@/state';
import {
  IconButton,
  Section,
  UserProfileLabel,
  Text,
  HorizontalGroup,
  ReviewStars,
  ReviewsLabel,
  EditUserProfileBottomSheet,
  TextLink,
} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useUpdates} from '@/view/useUpdates';

export const ProfileScreen = ({navigation}) => {
  const {tokens, signOut} = useAuth();
  const email = tokens?.idToken?.payload.email?.toString();
  const userId = tokens?.idToken?.payload.sub;
  const {data: summary} = useUserSummary(userId);

  const {theme, toggleTheme} = useTheme();
  const styles = getStyles(theme.appTheme);
  const {appMode, setAppMode} = useAppMode();
  const {data: stripeAccount} = useMerchantAccount();
  const {checkAndApplyUpdates} = useUpdates();

  const stripeAccountPressed = async () => {
    await StripeAccountsAPI.showDashboard();
  };

  const onReviewsPressed = () => {
    navigation.navigate('UserReviews', {userId});
  };

  const editProfilePressed = () => {
    editModalRef.current?.present();
  };

  const editModalRef = useRef<BottomSheetModal>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Section
        title="Profile"
        titleComponent={() => (
          <TextLink onPress={editProfilePressed}>Edit Profile</TextLink>
        )}>
        <UserProfileLabel linkToProfile userId={userId} />
        <HorizontalGroup
          style={{
            marginVertical: 6,
            justifyContent: 'flex-start',
          }}>
          <ReviewStars stars={summary?.average_stars} />
          <Text>{' • '}</Text>
          <ReviewsLabel
            totalReviews={summary?.total_reviews}
            onPress={onReviewsPressed}
          />
        </HorizontalGroup>
        <View style={styles.section}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.userid}>{userId}</Text>
        </View>
        {appMode === 'hosting' && (
          <View style={styles.section}>
            <Text style={styles.label}>Stripe ID:</Text>
            <Text style={styles.userid}>{stripeAccount?.account_id}</Text>
          </View>
        )}
      </Section>
      <View style={[styles.separator, {marginBottom: 12}]} />

      <IconButton icon="tv" text="Toggle Theme" onPress={toggleTheme} />
      <IconButton icon="cog" text="Settings" onPress={() => {}} />
      {appMode === 'hosting' && (
        <>
          <IconButton
            icon="cc-stripe"
            text="Stripe Account"
            onPress={stripeAccountPressed}
          />
          <IconButton
            icon="directions"
            text="Switch to Parking"
            onPress={() => setAppMode('parking')}
          />
        </>
      )}
      {appMode === 'parking' && (
        <IconButton
          icon="directions"
          text="Switch to Hosting"
          onPress={() => setAppMode('hosting')}
        />
      )}

      <IconButton
        icon="sync"
        text="Check for Updates"
        onPress={() => checkAndApplyUpdates(true)}
      />
      <IconButton icon="sign-out-alt" text="Sign Out" onPress={signOut} />
      <EditUserProfileBottomSheet ref={editModalRef} />
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
