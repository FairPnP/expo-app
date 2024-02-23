import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, AppTheme } from '@/view/theme';
import { HorizontalGroup, Text, VerticalGroup } from '../common';
import { UserReview } from '@/api';
import { toMonthYearString } from '@/utils';
import { ReviewStarsSelect } from '../reviews';
import { UserProfileLabel } from './UserProfileLabel';

export type UserReviewItemProps = {
  review: UserReview;
};

export const UserReviewItem = ({ review }: UserReviewItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <VerticalGroup>
        <UserProfileLabel userId={review.from_user_id} />
        <HorizontalGroup
          style={{ marginVertical: 6, justifyContent: 'flex-start' }}>
          <ReviewStarsSelect initialStars={review.stars} editable={false} size={20} />
          <Text style={{ fontWeight: 'bold' }}>
            {' • '}
            {toMonthYearString(review.created_at)}
          </Text>
        </HorizontalGroup>
        <Text>{review.message}</Text>
      </VerticalGroup>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 8,
    },
    icon: {
      paddingHorizontal: 10,
      flex: 0,
    },
    textArea: {
      flex: 1,
      paddingHorizontal: 4,
    },
    message: {
      color: 'grey',
    },
    dateArea: {},
  });
