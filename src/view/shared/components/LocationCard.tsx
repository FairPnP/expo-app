import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {StaticMap} from './StaticMap';
import {Text} from './common';

export type LocationCardProps = {
  lat?: number;
  lng?: number;
  mainText: string;
  secondaryText: string;
  zoom?: number;
};

export const LocationCard = (props: LocationCardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{props.mainText}</Text>
        <Text style={styles.secondaryText}>{props.secondaryText}</Text>
      </View>
      {props.lat && props.lng && (
        <StaticMap
          lat={props.lat}
          lng={props.lng}
          width={300}
          height={225}
          zoom={props.zoom ?? 15}
        />
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      borderColor: theme.colors.border,
      padding: 20,
    },
    textContainer: {
      marginBottom: 8,
      alignItems: 'center',
    },
    mainText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text,
    },
    secondaryText: {
      fontSize: 16,
      color: theme.colors.text,
    },
  });
