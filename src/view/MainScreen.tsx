import React, {Suspense} from 'react';
import {useAppMode} from '@/state';
import {LoadingScreen} from './LoadingScreen';

const ParkingMain = React.lazy(() =>
  import('./parking/ParkingMain').then(module => ({
    default: module.ParkingMain,
  })),
);
const HostingMain = React.lazy(() =>
  import('./hosting/HostingMain').then(module => ({
    default: module.HostingMain,
  })),
);

export const MainScreen = () => {
  const {appMode} = useAppMode();

  return (
    <Suspense fallback={<LoadingScreen />}>
      {appMode === 'hosting' && <HostingMain />}
      {appMode === 'parking' && <ParkingMain />}
    </Suspense>
  );
};
