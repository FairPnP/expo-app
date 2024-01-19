import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateAvailabilityRequest, Availability, AvailabilityAPI} from '@/api';
import {MY_AVAILABILITIES_QUERY_KEY} from '.';

export const useCreateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newAvailabilityData: CreateAvailabilityRequest) => {
      const response = await AvailabilityAPI.create(newAvailabilityData);
      return response.availability;
    },
    onSuccess: newAvailability => {
      // Invalidate and refetch availabilities query to update the list
      // queryClient.invalidateQueries({queryKey: [MY_AVAILABILITIES_QUERY_KEY]});

      // Optionally, update the availabilities cache directly if you want to append the new availability
      // without needing a refetch. This depends on your application's behavior.
      queryClient.setQueryData<Availability[]>(
        [MY_AVAILABILITIES_QUERY_KEY],
        old => [...old, newAvailability],
      );

      return newAvailability;
    },
  });
};
