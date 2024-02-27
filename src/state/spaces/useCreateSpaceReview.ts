import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSpaceReviewRequest, SpaceReviewAPI } from '@/api';
import { REVIEWS_QUERY_KEY, SPACE_QUERY_KEY } from './consts';

export const useCreateSpaceReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSpaceData: CreateSpaceReviewRequest) => {
      const response = await SpaceReviewAPI.create(newSpaceData);
      return response.space_review;
    },
    onSuccess: newSpaceReview => {
      // Invalidate and refetch spaces query to update the list
      queryClient.invalidateQueries({
        queryKey: [SPACE_QUERY_KEY, newSpaceReview.space_id, REVIEWS_QUERY_KEY],
      });

      // Optionally, update the spaces cache directly if you want to append the new space
      // without needing a refetch. This depends on your application's behavior.
      // queryClient.setQueryData<Space[]>([SPACE_QUERY_KEY], old => [
      //   ...old,
      //   newSpace,
      // ]);

      return newSpaceReview;
    },
  });
};
