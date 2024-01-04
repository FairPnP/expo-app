import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {AppTheme, useTheme} from '../themes';

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
      {loading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator color={styles.spinner.color} />
        </View>
      )}
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
    spinnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      color: theme.colors.primary,
    },
    imageContainer: {
      backgroundColor: theme.colors.disabled,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
