import {Reservation, ReservationAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';

export const useReservations = (offset_id?: number) => {
  const query = useQuery({
    queryKey: ['reservations', offset_id],
    queryFn: async () => {
      const response = await ReservationAPI.list({
        offset_id,
        user: true,
      });
      return response;
    },
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
