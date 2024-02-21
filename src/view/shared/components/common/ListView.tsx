import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';
import { FlashList } from '@shopify/flash-list';

export type ListViewProps<T> = {
  data: T[];
  renderItem: ({ item }: { item: T }) => JSX.Element;
  emptyMessage: string;
  keyExtractor?: (item: T, index: number) => string;
  style?: any;
  scrollEnabled?: boolean;
  separatorComponent?: React.ReactNode;
};

export const ListView = <T extends unknown>({
  data,
  renderItem,
  emptyMessage,
  keyExtractor,
  style,
  scrollEnabled,
  separatorComponent,
}: ListViewProps<T>) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const renderSeparator = () => {
    if (separatorComponent) {
      return separatorComponent;
    }

    return <View style={styles.separator} />;
  }

  return (
    <View style={styles.container}>
      {data?.length === 0 ? (
        <Text style={styles.message}>{emptyMessage}</Text>
      ) : (
        <FlashList
          scrollEnabled={scrollEnabled ?? false}
          showsVerticalScrollIndicator={false}
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
