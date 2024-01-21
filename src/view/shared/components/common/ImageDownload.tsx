import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {LoadingSpinner} from './LoadingSpinner';

type ImageDownloadProps = {
  url: string;
  style?: any;
  imageStyle?: any;
};

export const ImageDownload = ({url, style, imageStyle}: ImageDownloadProps) => {
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  useEffect(() => {
    // Download the image and update state
    const downloadImage = async () => {
      setLoading(false);
      setImageUri(url);
    };

    downloadImage();
  }, [url]);

  return (
    <View style={[styles.imageContainer, style]}>
      {loading && <LoadingSpinner />}
      {imageUri && (
        <Image
          resizeMode="cover"
          style={[styles.image, imageStyle]}
          source={{uri: imageUri}}
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
