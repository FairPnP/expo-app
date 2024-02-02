import React from 'react';
import {View, ScaledSize} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {ImageDownload} from './ImageDownload';

type ImageSwiperProps = {
  urls: string[];
  width: number;
  height: number;
};

export const ImageSwiper = ({width, height, urls}: ImageSwiperProps) => {
  const renderItem = ({item}) => {
    return (
      <ImageDownload
        url={item}
        style={{
          width: width,
          height: height,
        }}
      />
    );
  };

  const key = `${width}x${height}`;

  return (
    <View style={{width: width, height: height}}>
      <FlashList
        key={key}
        scrollEnabled={true}
        data={urls}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal={true}
        estimatedItemSize={width}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
};
