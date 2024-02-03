import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useUserReviews} from '@/state';
import {ListView, LoadingSpinner, Section, UserReviewItem} from '../components';
import {UserReview} from '@/api';
import {AppTheme, useTheme} from '@/view/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

export type UserReviewsScreenProps = {
  userId: string;
};

export const UserReviewsScreen = ({navigation, route}) => {
  const {userId} = route.params as UserReviewsScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {userReviews, isLoading} = useUserReviews(userId);

  if (isLoading) {
    return (
      <View>
        <LoadingSpinner />
      </View>
    );
  }

  const renderReview = ({item}: {item: UserReview}) => {
    return <UserReviewItem review={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section title="Reviews">
          <ListView
            data={userReviews}
            renderItem={renderReview}
            keyExtractor={item => item.id.toString()}
            emptyMessage="No reviews."
            style={styles.content}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 4,
    },
  });
