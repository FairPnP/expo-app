import { useQuery } from '@tanstack/react-query';
import { GOOGLE_PLACE_QUERY_KEY } from './consts';
import axios from 'axios';
import Constants from 'expo-constants';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

export const useGooglePlace = (place_id: string) => {
  return useQuery({
    queryKey: [GOOGLE_PLACE_QUERY_KEY, place_id],
    queryFn: async () => {
      const googleApiKey = Constants.expoConfig.extra.googleWebApiKey;
      const res = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${googleApiKey}`);

      return res.data.result as GooglePlaceDetail;
    },
    enabled: !!place_id,
  });
};
