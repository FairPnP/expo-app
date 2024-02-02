import {useInfiniteQuery} from '@tanstack/react-query';
import {SpaceReviewAPI} from '@/api';
import {SPACE_QUERY_KEY} from './consts';

export const useSpaceReviews = (limit = 10) => {
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
    queryKey: [SPACE_QUERY_KEY],
    queryFn: async ({pageParam = undefined}) => {
      const response = await SpaceReviewAPI.list({
        offset_id: pageParam,
        limit: limit,
      });
      return response;
    },
    getNextPageParam: lastPage => lastPage.next_offset_id,
    initialPageParam: undefined,
  });

  // Flatten the paginated data
  const spaces = data?.pages.flatMap(page => page.space_reviews) ?? [];

  return {
    spaces,
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
