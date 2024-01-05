import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/common';

export type LocationCardProps = {
  lat: string;
  lng: string;
  mainText: string;
  secondaryText: string;
  zoom: number;
};

export const LocationCard = (props: LocationCardProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const googleMapsApiKey = 'AIzaSyDMP8gXyXheqkMq8KdjZiIuM0YxADie1Z8';
  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.lng}&zoom=${props.zoom}&size=300x300&key=${googleMapsApiKey}&markers=color:red%7C${props.lat},${props.lng}`;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{props.mainText}</Text>
        <Text style={styles.secondaryText}>{props.secondaryText}</Text>
      </View>
      <Image source={{uri: imageUrl}} style={styles.image} />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 20,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 8,
    },
    textContainer: {
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
