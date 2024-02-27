import React, { Suspense, useEffect } from 'react';
import { useAppMode } from '@/state';
import { LoadingScreen } from './LoadingScreen';
import { AppState, AppStateStatus, View } from 'react-native';
import { HostingMain } from './hosting/HostingMain';
import { ParkingMain } from './parking/ParkingMain';
import { useFocusEffect } from '@react-navigation/native';
import { useUpdates } from './useUpdates';

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
  const { appMode, isLoading } = useAppMode();
  const { isLoading: updateLoading, checkAndApplyUpdates } = useUpdates();

  // Check for updates when the app is focused
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (status === 'active') {
        checkAndApplyUpdates();
      }
    });
    return () => subscription.remove();
  }, []);


  if (isLoading || updateLoading) {
    const message = updateLoading ? 'Updating' : `Loading ${appMode}`;
    return <LoadingScreen message={message} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Suspense fallback={<LoadingScreen />}> */}
      {appMode === 'parking' && <ParkingMain />}
      {appMode === 'hosting' && <HostingMain />}
      {/* </Suspense> */}
    </View>
  );
};
