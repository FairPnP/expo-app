import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useUserReviews } from '@/state';
import {
  ListView,
  LoadingSpinner,
  Section,
  UserProfileLabel,
  UserReviewItem,
} from '../components';
import { UserReview } from '@/api';
import { AppTheme, useTheme } from '@/view/theme';

export type UserReviewsScreenProps = {
  userId: string;
};

export const UserReviewsScreen = ({ route }) => {
  const { userId } = route.params as UserReviewsScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { userReviews, isLoading } = useUserReviews(userId);

  if (isLoading) {
    return (
      <View>
        <LoadingSpinner />
      </View>
    );
  }

  const renderReview = ({ item }: { item: UserReview }) => {
    return (
      <View style={{ padding: 8, borderBottomColor: theme.colors.border, borderBottomWidth: 1 }}>
        <UserReviewItem review={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <UserProfileLabel userId={userId} style={{ padding: 8 }} />
      <ScrollView>
        <Section style={{ padding: 8 }} title="Reviews">
          <ListView
            data={userReviews}
            renderItem={renderReview}
            keyExtractor={item => item.id.toString()}
            emptyMessage="No reviews."
            style={styles.content}
          />
        </Section>
      </ScrollView>
    </View>
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
