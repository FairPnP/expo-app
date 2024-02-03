import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {HorizontalGroup, Text, VerticalGroup} from '../common';
import {Space, SpaceReview} from '@/api';
import {toMonthYearString} from '@/utils';
import {ReviewStars} from '../ReviewStars';
import {UserProfileLabel} from '../users/UserProfileLabel';

export type SpaceReviewItemProps = {
  review: SpaceReview;
};

export const SpaceReviewItem = ({review}: SpaceReviewItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <VerticalGroup>
        <UserProfileLabel userId={review.user_id} />
        <HorizontalGroup
          style={{marginVertical: 6, justifyContent: 'flex-start'}}>
          <ReviewStars stars={review.stars} />
          <Text style={{fontWeight: 'bold'}}>
            {' • '}
            {toMonthYearString(review.last_modified)}
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
      backgroundColor: theme.colors.card,
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
