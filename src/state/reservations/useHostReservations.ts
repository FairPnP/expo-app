import {ReservationAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {HOST_RESERVATIONS_QUERY_KEY} from './consts';

export const useHostReservations = (offset_id?: number) => {
  const query = useQuery({
    queryKey: [HOST_RESERVATIONS_QUERY_KEY, offset_id],
    queryFn: async () => {
      const response = await ReservationAPI.listForHost({
        offset_id,
      });
      return response;
    },
  });

  return query;
};
