import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AvailabilityData} from '@/buildings';
import {AppTheme, useTheme} from '@/common';

type ClaimSpotScreenProps = {
  route: {
    params: {
      data: AvailabilityData;
    };
  };
  navigation: any;
};

export const ClaimSpotScreen = ({route, navigation}: ClaimSpotScreenProps) => {
  const data = route.params.data;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return <View />;
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
