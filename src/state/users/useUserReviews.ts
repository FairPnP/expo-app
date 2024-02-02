import {useInfiniteQuery} from '@tanstack/react-query';
import {UserReviewAPI} from '@/api';
import {USER_QUERY_KEY} from './consts';

export const useUserReviews = (limit = 10) => {
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
    queryKey: [USER_QUERY_KEY],
    queryFn: async ({pageParam = undefined}) => {
      const response = await UserReviewAPI.list({
        offset_id: pageParam,
        limit: limit,
      });
      return response;
    },
    getNextPageParam: lastPage => lastPage.next_offset_id,
    initialPageParam: undefined,
  });

  // Flatten the paginated data
  const users = data?.pages.flatMap(page => page.user_reviews) ?? [];

  return {
    users,
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
