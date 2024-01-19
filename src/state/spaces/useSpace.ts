import {useQuery} from '@tanstack/react-query';
import {SPACE_QUERY_KEY} from '.';
import {SpaceAPI} from '@/api';

export const useSpace = (id: number) => {
  return useQuery({
    queryKey: [SPACE_QUERY_KEY, id],
    queryFn: async () => {
      const response = await SpaceAPI.get(id);
      return response.space;
    },
    enabled: !!id,
  });
};
