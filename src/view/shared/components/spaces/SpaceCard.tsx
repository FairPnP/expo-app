import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HorizontalGroup, ImageDownload, Text, VerticalGroup} from '../common';
import {useTheme, AppTheme} from '@/view/theme';
import {Building, Space} from '@/api';
import {useSpaceSummary} from '@/state';
import {ReviewStars} from '../ReviewStars';
import {ReviewsLabel} from '../ReviewsLabel';

export type SpaceCardProps = {
  building: Building;
  space: Space;
  style?: any;
};

export const SpaceCard = ({building, space, style}: SpaceCardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {data: summary} = useSpaceSummary(space?.id);

  return (
    <View style={[styles.container, style]}>
      <HorizontalGroup>
        <ImageDownload
          url={space?.img_urls?.[0]}
          style={styles.image}
          imageStyle={styles.image}
        />
        <VerticalGroup style={styles.textContainer}>
          <Text>{building?.name}</Text>
          <Text>{space?.name}</Text>
          <HorizontalGroup>
            <ReviewStars stars={summary?.average_stars} />
            <ReviewsLabel totalReviews={summary?.total_reviews} />
          </HorizontalGroup>
        </VerticalGroup>
      </HorizontalGroup>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
    },
    text: {
      color: theme.colors.text,
    },
    image: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: 80,
      height: 80,
    },
    textContainer: {
      flex: 1,
      padding: 8,
    },
  });
