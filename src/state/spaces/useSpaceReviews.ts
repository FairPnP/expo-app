import { useInfiniteQuery } from '@tanstack/react-query';
import { SpaceReviewAPI } from '@/api';
import { REVIEWS_QUERY_KEY, SPACE_QUERY_KEY } from './consts';

export const useSpaceReviews = (space_id: string, limit = 10) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: [SPACE_QUERY_KEY, space_id, REVIEWS_QUERY_KEY],
    queryFn: async ({ pageParam = undefined }) => {
      const response = await SpaceReviewAPI.list({
        space_id,
        offset_id: pageParam,
        limit: limit,
      });
      return response;
    },
    getNextPageParam: lastPage => lastPage.next_offset_id,
    initialPageParam: undefined,
  });

  // Flatten the paginated data
  const spaceReviews = data?.pages.flatMap(page => page.space_reviews) ?? [];

  return {
    spaceReviews,
    isLoading,
    isError,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  };
};
