import {useQuery, useQueryClient} from '@tanstack/react-query';
import {Building, BuildingAPI} from '@/api';

export const useBuildings = buildingIds => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['buildings', buildingIds],
    queryFn: async () => {
      // Filter out IDs that are already cached
      const idsToFetch = buildingIds.filter(
        id => queryClient.getQueryData(['building', id]) === undefined,
      );

      // If all buildings are cached, return them directly
      if (idsToFetch.length === 0) {
        return buildingIds.map(id =>
          queryClient.getQueryData(['building', id]),
        );
      }

      // Fetch only the missing buildings
      const fetchedBuildings = (await BuildingAPI.list({ids: idsToFetch}))
        .buildings;

      // Update the cache with the newly fetched buildings
      fetchedBuildings.forEach(building => {
        queryClient.setQueryData(['building', building.id], building);
      });

      // Return all requested buildings
      return buildingIds.map(id => queryClient.getQueryData(['building', id]));
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!buildingIds && buildingIds.length > 0,
  });

  const buildingMap = query?.data?.reduce(
    (acc, building) => {
      acc[building.id] = building;
      return acc;
    },
    {} as Record<number, Building>,
  );

  return {
    ...query,
    buildingMap,
  };
};
