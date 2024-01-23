import {Linking, Platform} from 'react-native';

export const openMap = (label: string, lat: number, lng: number) => {
  const scheme = Platform.select({ios: 'maps://0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  Linking.openURL(url);
};
