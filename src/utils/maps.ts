import {Building} from '@/api';
import {Linking} from 'react-native';

export const openMap = (building: Building) => {
  const query = `${building.name}, ${building.city}, ${building.state}, ${building.postal_code}`;
  const googleMapsWebUrl = `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${building.place_id}`;

  Linking.openURL(googleMapsWebUrl);
};
