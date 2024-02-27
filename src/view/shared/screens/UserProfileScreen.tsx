import { StyleSheet, View } from 'react-native';
import {
  Card, HorizontalGroup, ImageDownload, InfiniteListView,
  LoadingSpinner, ModalRef, ReviewStars, Section, Text, TextLink, Title, UserReviewItem, VerticalGroup
} from '../components';
import React from 'react';
import { useUserProfile, useUserReviews, useUserSummary } from '@/state';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useTheme, AppTheme } from '@/view/theme';
import { UserReviewModal } from './UserReviewModal';

export type UserProfileScreenProps = {
  userId: string;
};

export const UserProfileScreen = ({ route }) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { userId } = route.params as UserProfileScreenProps;
  const { data: profile } = useUserProfile(userId);
  const { data: summary } = useUserSummary(userId);
  const { userReviews, fetchNextPage, hasNextPage, isFetchingNextPage } = useUserReviews(userId);
  const userReviewModalRef = React.createRef<ModalRef>();

  if (!profile || !userReviews) {
    return <LoadingSpinner />;
  }

  const renderReview = ({ item }) => {
    return (
      <View style={{ padding: 8, borderColor: theme.colors.border, borderWidth: 1, borderRadius: 16 }}>
        <UserReviewItem review={item} />
      </View>
    );
  };

  const onUserReviewPressed = () => {
    userReviewModalRef.current?.show();
  };

  return (
    <View style={styles.container}>
      <UserReviewModal user_id={userId} ref={userReviewModalRef} />
      <Card style={styles.profileArea}>
        <HorizontalGroup>
          <VerticalGroup style={{ alignItems: 'center' }}>
            {profile?.avatar_url ? (
              <ImageDownload
                url={profile?.avatar_url}
                style={styles.iconContainer}
                imageStyle={{
                  borderRadius: 64,
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                }}
              />
            ) : (
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name="user"
                  size={84}
                  color={theme.colors.border}
                  style={{ marginTop: 16, alignSelf: 'center' }}
                />
              </View>
            )}
            <Title>{profile.name}</Title>
            <Text>New to FairPnP</Text>
          </VerticalGroup>
          <VerticalGroup>
            <Title>{summary?.total_reviews ?? 0}</Title>
            <Text>{summary?.total_reviews === 1 ? 'Review' : 'Reviews'}</Text>
            <View style={styles.separator} />
            <ReviewStars stars={summary?.average_stars} />
            <Text>Rating</Text>
          </VerticalGroup>
        </HorizontalGroup>
      </Card>
      <View style={styles.separator} />
      <View style={styles.reviewArea}>
        <Section title='Reviews' titleComponent={() =>
          <TextLink onPress={onUserReviewPressed}>Write a review</TextLink>
        }>
          <InfiniteListView
            data={userReviews}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            renderItem={renderReview}
            keyExtractor={item => item.id.toString()}
            emptyMessage='No reviews.'
            itemsPerPage={1}
          />
        </Section>
      </View>
      <View style={styles.separator} />
      <HorizontalGroup style={{ justifyContent: 'flex-start' }}>
        <FontAwesome style={{ paddingRight: 12 }} name="flag" size={16} />
        <TextLink onPress={() => { alert("TODO") }}>Report this profile</TextLink>
      </HorizontalGroup>
    </View>
  );
}

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileArea: {
    width: 300,
    alignSelf: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.border,
    marginVertical: 32,
  },
  reviewArea: {
  },

});
