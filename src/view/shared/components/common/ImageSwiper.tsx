import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScaledSize} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {FlashList} from '@shopify/flash-list';
import {ImageDownload} from './ImageDownload';

type ImageSwiperProps = {
  urls: string[];
};

const calcDimensions = (window: ScaledSize) => {
  const width = window.width;
  const height = Math.min(window.width * 0.75, window.height * 0.4);
  return {width, height};
};

export const ImageSwiper = ({urls}: ImageSwiperProps) => {
  const [dimensions, setDimensions] = useState(
    calcDimensions(Dimensions.get('window')),
  );

  useEffect(() => {
    const onChange = ({window}: {window: ScaledSize}) => {
      setDimensions(calcDimensions(window));
    };

    const listener = Dimensions.addEventListener('change', onChange);
    return () => listener.remove();
  }, []);

  const renderItem = ({item}) => {
    return (
      <ImageDownload
        url={item}
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
    );
  };

  const key = `${dimensions.width}x${dimensions.height}`;

  return (
    <View style={{width: dimensions.width, height: dimensions.height}}>
      <FlashList
        key={key}
        scrollEnabled={true}
        data={urls}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal={true}
        estimatedItemSize={dimensions.width}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
};
