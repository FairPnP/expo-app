import { useQuery } from '@tanstack/react-query';
import { BUILDINGS_QUERY_KEY } from './consts';
import { BuildingAPI } from '@/api';

export const useBuilding = (id: number) => {
  return useQuery({
    queryKey: [BUILDINGS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await BuildingAPI.get(id);
      return response.building;
    },
    enabled: !!id,
  });
};
