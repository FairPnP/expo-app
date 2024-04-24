import {AvailabilityAPI, ListAvailabilityParams} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {MY_AVAILABILITIES_QUERY_KEY} from './consts';

export const useMyAvailabilities = (params?: {
  offset_id?: string;
  space_id?: string;
}) => {
  return useQuery({
    queryKey: [
      MY_AVAILABILITIES_QUERY_KEY,
      params?.space_id,
      params?.offset_id,
    ],
    queryFn: async () => {
      const response = await AvailabilityAPI.list({
        space_id: params?.space_id,
        offset_id: params?.offset_id,
        user: true,
      });
      return response;
    },
  });
};
