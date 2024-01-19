import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateBuildingRequest, BuildingAPI, Building} from '@/api';
import {BUILDINGS_QUERY_KEY} from '.';

export const useCreateBuilding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBuildingData: CreateBuildingRequest) => {
      const response = await BuildingAPI.create(newBuildingData);
      return response.building;
    },
    onSuccess: newBuilding => {
      // Invalidate and refetch buildings query to update the list
      // queryClient.invalidateQueries({queryKey: [BUILDINGS_QUERY_KEY]});

      // Optionally, update the buildings cache directly if you want to append the new building
      // without needing a refetch. This depends on your application's behavior.
      queryClient.setQueryData<Building[]>([BUILDINGS_QUERY_KEY], old => [
        ...old,
        newBuilding,
      ]);

      return newBuilding;
    },
  });
};
