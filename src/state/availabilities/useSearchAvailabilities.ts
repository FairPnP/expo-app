import {AvailabilityAPI, SearchAvailabilityRequest} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {AVAILABILITY_QUERY_KEY} from './consts';

export const useSearchAvailabilities = (params: SearchAvailabilityRequest) => {
  return useQuery({
    queryKey: [
      AVAILABILITY_QUERY_KEY,
      params.start_date,
      params.end_date,
      params.latitude,
      params.longitude,
      params.lat_delta,
      params.long_delta,
    ],
    queryFn: async () => {
      const response = await AvailabilityAPI.search(params);
      return response;
    },
  });
};
