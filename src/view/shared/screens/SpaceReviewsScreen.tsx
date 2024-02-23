import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSpaceReviews } from '@/state';
import {
  ListView,
  LoadingSpinner,
  Section,
  SpaceReviewItem,
} from '../components';
import { Space, SpaceReview } from '@/api';
import { AppTheme, useTheme } from '@/view/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SpaceReviewsScreenProps = {
  space: Space;
};

export const SpaceReviewsScreen = ({ route }) => {
  const { space } = route.params as SpaceReviewsScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { spaceReviews, isLoading } = useSpaceReviews(space.id);

  if (isLoading) {
    return (
      <View>
        <LoadingSpinner />
      </View>
    );
  }

  const renderReview = ({ item }: { item: SpaceReview }) => {
    return (
      <View style={{ padding: 8, borderBottomColor: theme.colors.border, borderBottomWidth: 1 }}>
        <SpaceReviewItem review={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section style={{ padding: 8 }} title="Reviews">
          <ListView
            data={spaceReviews}
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
