import React, {useEffect} from 'react';
import {useAppMode, useAuth} from '@/state';
import {LoadingScreen} from './LoadingScreen';
import {AppState, AppStateStatus, View} from 'react-native';
import {HostingMain} from './hosting/HostingMain';
import {ParkingMain} from './parking/ParkingMain';
import {useUpdates} from './useUpdates';
import {registerForPushNotificationsAsync} from './Notifications';
import * as Notifications from 'expo-notifications';
import {useNavigation} from '@react-navigation/native';

export const MainScreen = () => {
  const {appMode, isLoading} = useAppMode();
  const {isLoading: updateLoading, checkAndApplyUpdates} = useUpdates();
  const {userId} = useAuth();
  const navigation = useNavigation<any>();

  // Check for updates when the app is focused
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => {
        if (status === 'active') {
          checkAndApplyUpdates();
        }
      },
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    registerForPushNotificationsAsync();

    const notifListener = Notifications.addNotificationReceivedListener(notif =>
      console.log('notification', notif),
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('notif response', response.notification.request.content);
        let data = response.notification.request.content.data;
        console.log('screen', data?.screen_name);
        if (data?.screen_name) {
          navigation.navigate(data.screen_name, data.screen_params);
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(notifListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [userId]);

  if (isLoading || updateLoading) {
    const message = updateLoading ? 'Updating' : `Loading ${appMode}`;
    return <LoadingScreen message={message} />;
  }

  return (
    <View style={{flex: 1}}>
      {appMode === 'parking' && <ParkingMain />}
      {appMode === 'hosting' && <HostingMain />}
    </View>
  );
};
