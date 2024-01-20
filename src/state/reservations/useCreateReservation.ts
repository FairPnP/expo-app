import {useMutation, useQueryClient} from '@tanstack/react-query';
import {CreateReservationRequest, Reservation, ReservationAPI} from '@/api';
import {MY_RESERVATIONS_QUERY_KEY} from './consts';

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

      // Optionally, update the reservations cache directly if you want to append the new reservation
      // without needing a refetch. This depends on your application's behavior.
      // queryClient.setQueryData<Reservation[]>(
      //   [MY_RESERVATIONS_QUERY_KEY],
      //   old => [...old, newReservation],
      // );

      return newReservation;
    },
  });
};
