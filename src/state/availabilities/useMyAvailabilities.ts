import {AvailabilityAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {MY_AVAILABILITIES_QUERY_KEY} from './consts';

export const useMyAvailabilities = (offset_id?: number) => {
  return useQuery({
    queryKey: [MY_AVAILABILITIES_QUERY_KEY, offset_id],
    queryFn: async () => {
      const response = await AvailabilityAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
  });
};
