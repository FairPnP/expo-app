import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';

type ImageDownloadProps = {
  url: string;
  style?: any;
  imageStyle?: any;
};

export const ImageDownload = ({url, style, imageStyle}: ImageDownloadProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={[styles.imageContainer, style]}>
      {url && (
        <Image
          resizeMode="cover"
          style={[styles.image, imageStyle]}
          source={{uri: url}}
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
