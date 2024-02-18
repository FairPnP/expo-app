import { useInfiniteQuery } from '@tanstack/react-query';
import { SpaceAPI } from '@/api';
import { MY_SPACES_QUERY_KEY, SPACE_QUERY_KEY } from './consts';

export const useMySpaces = (limit = 3) => {
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
    queryKey: [SPACE_QUERY_KEY, MY_SPACES_QUERY_KEY],
    queryFn: async ({ pageParam = undefined }) => {
      const response = await SpaceAPI.list({
        offset_id: pageParam,
        limit: limit,
      });
      return response;
    },
    getNextPageParam: lastPage => lastPage.next_offset_id,
    initialPageParam: undefined,
  });

  // Flatten the paginated data
  const spaces = data?.pages.flatMap(page => page.spaces) ?? [];

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
