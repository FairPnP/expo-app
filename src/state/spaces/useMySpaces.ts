import {Space, SpaceAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {MY_SPACES_QUERY_KEY} from './consts';

export const useMySpaces = (offset_id?: number) => {
  const query = useQuery({
    queryKey: [MY_SPACES_QUERY_KEY, offset_id],
    queryFn: async () => {
      const response = await SpaceAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const spaceMap = query.data?.spaces.reduce(
    (acc, space) => {
      acc[space.id] = space;
      return acc;
    },
    {} as Record<number, Space>,
  );

  return {
    ...query,
    spaceMap,
  };
};
