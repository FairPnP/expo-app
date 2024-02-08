import React, {Suspense} from 'react';
import {useAppMode} from '@/state';
import {LoadingScreen} from './LoadingScreen';
import {View} from 'react-native';
import {HostingMain} from './hosting/HostingMain';
import {ParkingMain} from './parking/ParkingMain';

// const ParkingMain = React.lazy(() =>
//   import('./parking/ParkingMain').then(module => ({
//     default: module.ParkingMain,
//   })),
// );
// const HostingMain = React.lazy(() =>
//   import('./hosting/HostingMain').then(module => ({
//     default: module.HostingMain,
//   })),
// );

export const MainScreen = () => {
  const {appMode, isLoading} = useAppMode();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      {/* <Suspense fallback={<LoadingScreen />}> */}
      {appMode === 'parking' && <ParkingMain />}
      {appMode === 'hosting' && <HostingMain />}
      {/* </Suspense> */}
    </View>
  );
};
