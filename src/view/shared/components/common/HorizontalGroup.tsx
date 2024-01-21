import React from 'react';
import {View, StyleSheet} from 'react-native';

type HorizontalGroupProps = {
  children: React.ReactNode;
  style?: any;
};

export const HorizontalGroup = ({children, style}: HorizontalGroupProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
});
