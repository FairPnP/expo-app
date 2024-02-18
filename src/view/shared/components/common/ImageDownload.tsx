import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';
import FastImage, { ResizeMode } from 'react-native-fast-image'

type ImageDownloadProps = {
  url: string;
  style?: any;
  imageStyle?: any;
  resizeMode?: ResizeMode;
};

export const ImageDownload = ({ url, style, imageStyle, resizeMode }: ImageDownloadProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={[styles.imageContainer, style]}>
      {url && (
        <FastImage
          key={url}
          style={[styles.image, imageStyle]}
          source={{
            uri: url,
          }}
          resizeMode={resizeMode ?? FastImage.resizeMode.cover}
        />
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    imageContainer: {
      backgroundColor: theme.colors.disabled,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
