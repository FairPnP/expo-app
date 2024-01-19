// useUpdateReservation.js
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ReservationAPI, UpdateReservationRequest} from '@/api';
import {MY_RESERVATIONS_QUERY_KEY} from '.';

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      reservationId,
      updateData,
    }: {
      reservationId: number;
      updateData: UpdateReservationRequest;
    }) => {
      const response = await ReservationAPI.update(reservationId, updateData);
      return response.reservation;
    },
    onSuccess: updatedReservation => {
      // Invalidate and refetch reservations query to update the list
      // queryClient.invalidateQueries({queryKey: [MY_RESERVATIONS_QUERY_KEY]});

      // Update the individual reservation in the cache if needed
      queryClient.setQueryData(
        [MY_RESERVATIONS_QUERY_KEY, updatedReservation.id],
        updatedReservation,
      );

      // Additional handling if there are other queries that depend on this reservation's data
    },
    // Optional: onError, onMutate, etc.
  });
};
