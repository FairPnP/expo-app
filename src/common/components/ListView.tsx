import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/common';

export type ListViewProps<T> = {
  data: T[];
  renderItem: ({item}: {item: T}) => JSX.Element;
  emptyMessage: string;
  keyExtractor?: (item: T, index: number) => string;
  style?: any;
};

export const ListView = <T extends unknown>({
  data,
  renderItem,
  emptyMessage,
  keyExtractor,
  style,
}: ListViewProps<T>) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <>
      {data.length === 0 ? (
        <Text style={styles.message}>{emptyMessage}</Text>
      ) : (
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={keyExtractor}
          style={style}
        />
      )}
    </>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    message: {
      color: theme.colors.text,
      fontSize: 16,
      textAlign: 'center',
    },
    separator: {
      height: 4,
    },
  });
