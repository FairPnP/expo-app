import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';

export type SectionProps = {
  children: React.ReactNode;
  title?: string;
  style?: any;
};

export const Section = ({children, style, title}: SectionProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <View style={[styles.section, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });
