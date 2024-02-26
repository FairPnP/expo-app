import {useQuery} from '@tanstack/react-query';
import {AVAILABILITY_QUERY_KEY} from './consts';
import {AvailabilityAPI} from '@/api';

export const useAvailability = (id: string) => {
  return useQuery({
    queryKey: [AVAILABILITY_QUERY_KEY, id],
    queryFn: async () => {
      const response = await AvailabilityAPI.get(id);
      return response.availability;
    },
    enabled: !!id,
  });
};
