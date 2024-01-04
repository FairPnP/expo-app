import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  AppTheme,
  HorizontalGroup,
  ImageDownload,
  Text,
  VerticalGroup,
  useTheme,
} from '@/common';
import {Building} from '@/buildings';
import {Space} from '@/spaces';

export type SpaceCardProps = {
  building: Building;
  space: Space;
  style?: any;
};

export const SpaceCard = ({building, space, style}: SpaceCardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, style]}>
      <HorizontalGroup>
        <ImageDownload
          url={space?.picture_url}
          style={styles.image}
          imageStyle={styles.image}
        />
        <VerticalGroup style={styles.textContainer}>
          <Text>{building?.name}</Text>
          <Text>{space?.name}</Text>
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
