import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateReservationRequest, ReservationAPI} from '@/api';
import {MY_RESERVATIONS_QUERY_KEY} from './consts';
import {AVAILABILITY_QUERY_KEY} from '../availabilities/consts';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReservationData: CreateReservationRequest) => {
      const response = await ReservationAPI.create(newReservationData);
      return response.reservation;
    },
    onSuccess: newReservation => {
      // Invalidate and refetch reservations query to update the list
      queryClient.invalidateQueries({queryKey: [MY_RESERVATIONS_QUERY_KEY]});
      queryClient.invalidateQueries({queryKey: [AVAILABILITY_QUERY_KEY]});

      return newReservation;
    },
  });
};
