import {useQuery} from '@tanstack/react-query';
import {RESERVATION_QUERY_KEY} from './consts';
import {ReservationAPI} from '@/api';

export const useReservation = (id: string) => {
  return useQuery({
    queryKey: [RESERVATION_QUERY_KEY, id],
    queryFn: async () => {
      const response = await ReservationAPI.get(id);
      return response.reservation;
    },
    enabled: !!id,
  });
};
