import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, AppTheme } from '@/view/theme';
import FastImage from 'react-native-fast-image'

export type StaticMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  width: number;
  height: number;
  style?: any;
};

export const StaticMap = (props: StaticMapProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const googleMapsApiKey = 'AIzaSyDMP8gXyXheqkMq8KdjZiIuM0YxADie1Z8';
  const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat
    },${props.lng}&zoom=${props.zoom ?? 16
    }&size=${props.width}x${props.height}&key=${googleMapsApiKey}&markers=color:red%7C${props.lat},${props.lng
    }`;

  return (
    <FastImage
      style={[
        styles.image,
        { width: props.width, height: props.height },
        props.style,
      ]}
      source={{
        uri: imageUrl,
      }}
    />
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    image: {
      borderRadius: 8,
    },
  });
