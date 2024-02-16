import React from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ImageDownload } from './ImageDownload';

type ImageSwiperProps = {
  urls: string[];
  width: number;
  height: number;
};

export const ImageSwiper = ({ width, height, urls }: ImageSwiperProps) => {
  const [page, setPage] = React.useState(1);

  const onChange = React.useCallback(
    ({ viewableItems }) => {
      setPage(viewableItems[0].index + 1);
    },
    [setPage],
  );

  const renderItem = ({ item }) => {
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
    <View style={{ width: width, height: height }}>
      <FlashList
        key={key}
        scrollEnabled={true}
        data={urls}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal={true}
        estimatedItemSize={width}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onChange}
      />
      {urls.length > 1 && (
        <View style={styles.pageInfo as any}>
          <Text style={styles.pageInfoText}>{`${page}/${urls.length}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  pageInfo: {
    position: 'absolute',
    bottom: 10,
    height: 32,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  pageInfoText: {
    color: 'white',
  },
};
