import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateUserReviewRequest, UserReviewAPI } from '@/api';
import { REVIEWS_QUERY_KEY, USER_QUERY_KEY } from './consts';

export const useCreateUserReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUserData: CreateUserReviewRequest) => {
      const response = await UserReviewAPI.create(newUserData);

      return response.user_review;
    },
    onSuccess: newUserReview => {
      // Invalidate and refetch users query to update the list
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEY, newUserReview.to_user_id, REVIEWS_QUERY_KEY],
      });

      // Optionally, update the users cache directly if you want to append the new user
      // without needing a refetch. This depends on your application's behavior.
      // queryClient.setQueryData<User[]>([MY_USERS_QUERY_KEY], old => [
      //   ...old,
      //   newUser,
      // ]);

      return newUserReview;
    },
  });
};
