import {useCallback, useState} from 'react';
import {useRecoilState} from 'recoil';
import {reservationState} from '../state';
import {ReservationAPI} from '../api';

export const useLoadReservations = () => {
  const [reservations, setReservations] = useRecoilState(reservationState);
  const [isLoading, setLoading] = useState(false);

  const refreshReservation = useCallback(async () => {
    setLoading(true);
    try {
      const reservationResponse = await ReservationAPI.list({});
      setReservations(reservationResponse.reservations);
    } catch (error) {
      console.error('Error fetching reservation:', error);
    } finally {
      setLoading(false);
    }
  }, [setReservations]);

  return {reservations, refreshReservation, isLoading};
};
