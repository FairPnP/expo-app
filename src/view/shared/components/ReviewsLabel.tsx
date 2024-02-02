import React from 'react';
import {Text, TextLink} from './common';

export type ReviewsLabelProps = {
  totalReviews: number;
  onPress?: () => void;
};

export const ReviewsLabel = ({totalReviews, onPress}: ReviewsLabelProps) => {
  if (onPress) {
    return (
      <TextLink onPress={onPress}>
        {totalReviews ?? '0'} {totalReviews === 1 ? 'review' : 'reviews'}
      </TextLink>
    );
  } else {
    return (
      <Text>
        {totalReviews ?? '0'} {totalReviews === 1 ? 'review' : 'reviews'}
      </Text>
    );
  }
};
