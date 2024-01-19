import {useEffect} from 'react';
import {Platform} from 'react-native';
// import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const useLocationPermission = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
};

const requestLocationPermission = async () => {
  // const locationPermission = Platform.select({
  //   ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //   android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  // });

  // let permissionResult = await check(locationPermission);

  // if (permissionResult === RESULTS.DENIED) {
  //   permissionResult = await request(locationPermission);
  // }
};
