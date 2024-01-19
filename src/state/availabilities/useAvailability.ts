import {useQuery} from '@tanstack/react-query';
import {AVAILABILITY_QUERY_KEY} from '.';
import {AvailabilityAPI} from '@/api';

export const useAvailability = (id: number) => {
  return useQuery({
    queryKey: [AVAILABILITY_QUERY_KEY, id],
    queryFn: async () => {
      const response = await AvailabilityAPI.get(id);
      return response.availability;
    },
    enabled: !!id,
  });
};
