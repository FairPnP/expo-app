import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { LoadingSpinner, Text } from './shared';

export type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <View style={{ height: 240 }}>
        <Image source={require('../../assets/icon.png')} style={{ width: 120, height: 120, marginBottom: 24 }} />
        <Text>
          {message ? message : 'Loading'}
        </Text>
        <LoadingSpinner />
      </View>
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
