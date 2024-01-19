import {AvailabilityAPI, SearchAvailabilityRequest} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {AVAILABILITY_QUERY_KEY} from '.';

export const useSearchAvailabilities = (params: SearchAvailabilityRequest) => {
  return useQuery({
    queryKey: [AVAILABILITY_QUERY_KEY, params],
    queryFn: async () => {
      const response = await AvailabilityAPI.search(params);
      return response;
    },
  });
};
