import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {FlashList} from '@shopify/flash-list';
import {ImageDownload} from './ImageDownload';

type ImageDownloadProps = {
  urls: string[];
};

export const ImageSwiper = ({urls}: ImageDownloadProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const windowWidth = Dimensions.get('window').width;

  const renderItem = ({item}) => {
    return (
      <ImageDownload
        url={item}
        style={{
          width: windowWidth,
          height: 300,
        }}
      />
    );
  };

  return (
    <View style={styles.listContainer}>
      <FlashList
        scrollEnabled={true}
        data={urls}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal={true}
        estimatedItemSize={windowWidth}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    listContainer: {
      width: '100%',
      height: 300,
    },
  });
