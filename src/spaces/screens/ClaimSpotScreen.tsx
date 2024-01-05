import {StyleSheet, View} from 'react-native';
import React from 'react';
import {AppTheme, useTheme} from '@/common';

type ClaimSpotScreenProps = {};

export const ClaimSpotScreen = ({}: ClaimSpotScreenProps) => {
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
