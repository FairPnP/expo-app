import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {FlashList} from '@shopify/flash-list';

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
    <View style={styles.container}>
      {data?.length === 0 ? (
        <Text style={styles.message}>{emptyMessage}</Text>
      ) : (
        <FlashList
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={keyExtractor}
          contentContainerStyle={style}
          estimatedItemSize={300}
        />
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 100,
    },
    message: {
      color: theme.colors.text,
      fontSize: 16,
      textAlign: 'center',
    },
    separator: {
      height: 4,
    },
  });
