import React, {useCallback} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {FlashList} from '@shopify/flash-list';

export type InfiniteListViewProps<T> = {
  data: T[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  renderItem: ({item}: {item: T}) => JSX.Element;
  keyExtractor: (item: T) => string;
  emptyMessage: string;
  itemsPerPage?: number;
};

const chunkData = (data, chunkSize) => {
  return data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};

export const InfiniteListView = <T extends unknown>({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  renderItem,
  keyExtractor,
  emptyMessage,
  itemsPerPage,
}: InfiniteListViewProps<T>) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const renderFooter = () => {
    return isFetchingNextPage ? (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    ) : null;
  };

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const chunkedData = useCallback(chunkData(data, itemsPerPage ?? 3), [data]);

  const renderPage = ({item, index}) => (
    <View style={styles.pageContainer}>
      {item.map((dataItem, idx) => (
        <View key={keyExtractor(dataItem)} style={styles.itemContainer}>
          {renderItem({item: dataItem})}
        </View>
      ))}
    </View>
  );

  return (
    <View style={{flex: 1}}>
      {chunkedData.length === 0 ? (
        <Text style={styles.message}>{emptyMessage}</Text>
      ) : (
        <FlashList
          data={chunkedData}
          renderItem={renderPage}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={300}
        />
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    message: {
      color: theme.colors.text,
      fontSize: 16,
      textAlign: 'center',
    },
    pageContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    itemContainer: {
      width: 300,
      marginHorizontal: 10,
      marginVertical: 4,
    },
  });
