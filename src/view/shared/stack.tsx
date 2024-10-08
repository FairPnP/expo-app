import {
  ReservationChatScreen,
  SpaceReviewsScreen,
  StripeRefreshScreen,
  StripeReturnScreen,
  UserReviewsScreen,
  ReservationDetailsScreen,
  ViewListingScreen,
  UserProfileScreen,
} from './screens';

export const addSharedStackScreens = (Stack: any) => {
  return (
    <>
      <Stack.Screen
        name="ViewListing"
        component={ViewListingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserReviews"
        component={UserReviewsScreen}
        options={{
          headerTitle: 'User Reviews',
        }}
      />
      <Stack.Screen
        name="SpaceReviews"
        component={SpaceReviewsScreen}
        options={{
          headerTitle: 'Listing Reviews',
        }}
      />
      <Stack.Screen
        name="ReservationChat"
        component={ReservationChatScreen}
        options={{
          headerTitle: 'Chat',
        }}
      />
      <Stack.Screen
        name="ReservationDetails"
        component={ReservationDetailsScreen}
        options={{
          headerTitle: 'Reservation Details',
        }}
      />
      <Stack.Screen
        name="StripeReturn"
        component={StripeReturnScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StripeRefresh"
        component={StripeRefreshScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTitle: 'User Profile',
        }}
      />
    </>
  );
};
