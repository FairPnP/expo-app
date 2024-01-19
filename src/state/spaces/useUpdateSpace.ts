// useUpdateSpace.js
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SpaceAPI, UpdateSpaceRequest} from '@/api';
import {SPACES_QUERY_KEY} from '.';

export const useUpdateSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      spaceId,
      updateData,
    }: {
      spaceId: number;
      updateData: UpdateSpaceRequest;
    }) => {
      const response = await SpaceAPI.update(spaceId, updateData);
      return response.space;
    },
    onSuccess: updatedSpace => {
      // Invalidate and refetch spaces query to update the list
      queryClient.invalidateQueries({queryKey: [SPACES_QUERY_KEY]});

      // Update the individual space in the cache if needed
      queryClient.setQueryData(['space', updatedSpace.id], updatedSpace);

      // Additional handling if there are other queries that depend on this space's data
    },
    // Optional: onError, onMutate, etc.
  });
};
