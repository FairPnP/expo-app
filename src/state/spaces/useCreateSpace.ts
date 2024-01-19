import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateSpaceRequest, SpaceAPI} from '@/api';
import {SPACES_QUERY_KEY} from '.';

export const useCreateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSpaceData: CreateSpaceRequest) => {
      const response = await SpaceAPI.create(newSpaceData);
      return response.space;
    },
    onSuccess: newSpace => {
      // Invalidate and refetch spaces query to update the list
      queryClient.invalidateQueries({queryKey: [SPACES_QUERY_KEY]});

      // Optionally, update the spaces cache directly if you want to append the new space
      // without needing a refetch. This depends on your application's behavior.
      // queryClient.setQueryData(['spaces'], old => [...old, newSpace]);

      return newSpace;
    },
  });
};
