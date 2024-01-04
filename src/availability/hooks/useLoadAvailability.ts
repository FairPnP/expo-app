import {useCallback, useState} from 'react';
import {useRecoilState} from 'recoil';
import {AvailabilityAPI} from '../api';
import {availabilityState} from '../state';

export const useLoadAvailability = () => {
  const [availabilities, setAvailabilities] = useRecoilState(availabilityState);
  const [isLoading, setLoading] = useState(false);

  const refreshAvailability = useCallback(async () => {
    setLoading(true);
    try {
      const availabilityResponse = await AvailabilityAPI.list({});
      setAvailabilities(availabilityResponse.availability);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  }, [setAvailabilities]);

  return {availabilities, refreshAvailability, isLoading};
};
