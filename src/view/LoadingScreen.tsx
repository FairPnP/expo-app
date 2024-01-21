import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {useAppMode} from '@/state';
import {LoadingSpinner} from './shared';

export const LoadingScreen = () => {
  const {appMode} = useAppMode();

  return (
    <View style={styles.container}>
      <Text>Loading {appMode}...</Text>
      <LoadingSpinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
