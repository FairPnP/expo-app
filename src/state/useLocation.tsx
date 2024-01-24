import * as Location from 'expo-location';
import {useEffect, useState} from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState<string>(null);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return {location, errorMsg};
};
