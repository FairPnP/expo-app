import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, HorizontalGroup, ImageDownload, Text, VerticalGroup } from '../common';
import { useTheme, AppTheme } from '@/view/theme';
import { Building, Space } from '@/api';
import { useSpaceSummary } from '@/state';
import { ReviewStars } from '../ReviewStars';
import { ReviewsLabel } from '../ReviewsLabel';

export type SpaceCardProps = {
  building: Building;
  space: Space;
  style?: any;
};

export const SpaceCard = ({ building, space, style }: SpaceCardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const { data: summary } = useSpaceSummary(space?.id);

  return (
    <View style={[styles.container, style]}>
      <Card style={styles.card}>
        <HorizontalGroup>
          <ImageDownload
            url={space?.img_urls?.[0]}
            style={styles.image}
            imageStyle={styles.image}
          />
          <VerticalGroup style={styles.textContainer}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{space?.name}</Text>
              <Text>{building?.name}</Text>
            </View>
            <HorizontalGroup>
              <ReviewStars stars={summary?.average_stars} />
              <ReviewsLabel totalReviews={summary?.total_reviews} />
            </HorizontalGroup>
          </VerticalGroup>
        </HorizontalGroup>
      </Card>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 8,
    },
    card: {
      backgroundColor: theme.colors.background,
      height: 100,
      padding: 0,
    },
    text: {
      color: theme.colors.text,
    },
    image: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: 100,
      height: 100,
    },
    textContainer: {
      flex: 1,
      padding: 8,
      height: 100,
    },
  });
