import {Reservation, ReservationAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {MY_RESERVATIONS_QUERY_KEY} from './consts';

export const useMyReservations = (offset_id?: number) => {
  const query = useQuery({
    queryKey: [MY_RESERVATIONS_QUERY_KEY, offset_id],
    queryFn: async () => {
      const response = await ReservationAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const reservationMap = query.data?.reservations.reduce(
    (acc, reservation) => {
      acc[reservation.id] = reservation;
      return acc;
    },
    {} as Record<number, Reservation>,
  );

  return {
    ...query,
    reservationMap,
  };
};
