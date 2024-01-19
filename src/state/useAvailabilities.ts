import {AvailabilityAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';

export const useAvailabilities = (offset_id?: number) => {
  return useQuery({
    queryKey: ['availabilities', offset_id],
    queryFn: async () => {
      const response = await AvailabilityAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
  });
};
