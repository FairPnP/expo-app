import React, {Suspense} from 'react';
import {useAppMode} from '@/state';
import {LoadingScreen} from './LoadingScreen';
import {View} from 'react-native';
import {ParkingMain} from './parking/ParkingMain';
import {HostingMain} from './hosting/HostingMain';

export const MainScreen = () => {
  const {appMode} = useAppMode();

  return (
    <View style={{flex: 1}}>
      {appMode === 'parking' && <ParkingMain />}
      {appMode === 'hosting' && <HostingMain />}
    </View>
  );
};
