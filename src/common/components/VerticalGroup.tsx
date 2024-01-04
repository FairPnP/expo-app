import React from 'react';
import {View, StyleSheet} from 'react-native';

type VerticalGroupProps = {
  children: React.ReactNode;
  style?: any;
};

export const VerticalGroup = ({children, style}: VerticalGroupProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
