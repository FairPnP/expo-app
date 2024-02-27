import { View, StyleSheet } from 'react-native';
import React from 'react';
import { LoadingSpinner, Text } from './shared';

export type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>
        {message ? message : 'Loading'}
      </Text>
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
