import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AvailabilityAPI} from '@/api';
import {MY_AVAILABILITIES_QUERY_KEY} from './consts';

export const useDeleteAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await AvailabilityAPI.delete(id);
    },
    onSuccess: () => {
      // Invalidate and refetch availabilities query to update the list
      queryClient.invalidateQueries({
        queryKey: [MY_AVAILABILITIES_QUERY_KEY],
      });
    },
  });
};
