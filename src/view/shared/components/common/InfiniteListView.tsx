import React, { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';

export type InfiniteListViewProps<T> = {
  data: T[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor: (item: T) => string;
  emptyMessage: string;
  itemsPerPage?: number;
};

function chunkData<T>(data: T[], chunkSize: number) {
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

  const chunkedData = useMemo(() => chunkData(data, itemsPerPage ?? 3), [data, itemsPerPage]);

  const renderPage = ({ item }: { item: T[] }) => (
    <View key={`page-${item.length}`} style={styles.pageContainer}>
      {item.map((dataItem: T) => (
        <View key={keyExtractor(dataItem)} style={styles.itemContainer}>
          {renderItem({ item: dataItem })}
        </View>
      ))}
    </View>
  );

  if (chunkedData.length === 0) {
    return (
      <Text style={styles.message}>{emptyMessage}</Text>
    );
  }

  return (
    <FlatList
      data={chunkedData}
      renderItem={renderPage}
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
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
    },
    itemContainer: {
      width: 400,
      marginHorizontal: 10,
      marginVertical: 4,
    },
  });
