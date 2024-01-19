import {Space, SpaceAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';

export const useSpaces = (offset_id?: number) => {
  const query = useQuery({
    queryKey: ['spaces', offset_id],
    queryFn: async () => {
      const response = await SpaceAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
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
