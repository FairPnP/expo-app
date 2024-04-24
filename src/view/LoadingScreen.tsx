import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {LoadingSpinner, Text} from './shared';
import {AppTheme, useTheme} from './theme';

export type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen = ({message}: LoadingScreenProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={{height: 240}}>
        <Image
          source={require('../../assets/icon.png')}
          style={{width: 120, height: 120, marginBottom: 24}}
        />
        <Text>{message ? message : 'Loading'}</Text>
        <LoadingSpinner />
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
  });
