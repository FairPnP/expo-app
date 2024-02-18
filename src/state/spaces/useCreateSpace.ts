import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSpaceRequest, SpaceAPI } from '@/api';
import { MY_SPACES_QUERY_KEY, SPACE_QUERY_KEY } from './consts';

export const useCreateSpace = (opts?: { skipInvalidate?: boolean }) => {
  const queryClient = useQueryClient();

  const invalidateMySpaces = () => {
    queryClient.invalidateQueries({ queryKey: [SPACE_QUERY_KEY, MY_SPACES_QUERY_KEY] });
  }

  const mutation = useMutation({
    mutationFn: async (newSpaceData: CreateSpaceRequest) => {
      const response = await SpaceAPI.create(newSpaceData);
      return response.space;
    },
    onSuccess: newSpace => {
      // Invalidate and refetch spaces query to update the list
      if (!opts?.skipInvalidate) {
        invalidateMySpaces();
      }

      return newSpace;
    },
  });

  return {
    ...mutation,
    invalidateMySpaces,
  };
};
