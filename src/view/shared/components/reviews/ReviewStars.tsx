import React from 'react';
import { HorizontalGroup, Text } from '../common';
import { FontAwesome } from '@expo/vector-icons';

export type ReviewStarsProps = {
  stars: number;
  style?: any;
};

export const ReviewStars = ({ stars, style }: ReviewStarsProps) => {
  return (
    <HorizontalGroup style={[styles.group, style]}>
      <FontAwesome name="star" size={16} />
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
        {' '}
        {stars > 0 ? stars.toString() : '-'}
      </Text>
    </HorizontalGroup>
  );
};

const styles = {
  group: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
};
