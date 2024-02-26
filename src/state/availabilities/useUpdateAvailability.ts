// useUpdateAvailability.js
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AvailabilityAPI, UpdateAvailabilityRequest} from '@/api';
import {MY_AVAILABILITIES_QUERY_KEY} from './consts';

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      availabilityId,
      updateData,
    }: {
      availabilityId: string;
      updateData: UpdateAvailabilityRequest;
    }) => {
      const response = await AvailabilityAPI.update(availabilityId, updateData);
      return response.availability;
    },
    onSuccess: updatedAvailability => {
      // Invalidate and refetch availabilities query to update the list
      // queryClient.invalidateQueries({queryKey: [MY_AVAILABILITIES_QUERY_KEY]});

      // Update the individual availability in the cache if needed
      queryClient.setQueryData(
        [MY_AVAILABILITIES_QUERY_KEY, updatedAvailability.id],
        updatedAvailability,
      );

      // Additional handling if there are other queries that depend on this availability's data
    },
    // Optional: onError, onMutate, etc.
  });
};
