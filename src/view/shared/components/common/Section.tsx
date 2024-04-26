import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {HorizontalGroup} from './HorizontalGroup';

export type SectionProps = {
  children: React.ReactNode;
  title?: string;
  style?: any;
  titleComponent?: () => React.ReactNode;
};

export const Section = ({
  children,
  style,
  title,
  titleComponent,
}: SectionProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <View style={[styles.section, style]}>
      <HorizontalGroup style={styles.header}>
        {title && <Text style={styles.title}>{title}</Text>}
        {titleComponent && titleComponent()}
      </HorizontalGroup>
      {children}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    section: {},
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
  });
