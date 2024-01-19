import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';

export type MyFavoriteProps = {
  favoriteName: string;
};

export const MyFavorite = ({favoriteName}: MyFavoriteProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{favoriteName}</Text>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
    },
    text: {
      color: theme.colors.text,
    },
  });
