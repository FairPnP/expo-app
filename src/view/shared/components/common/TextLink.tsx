// TextComponent.js
import React from 'react';
import { Text as ReactText, StyleSheet, TouchableOpacity } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';

export type TextLinkProps = {
  children: React.ReactNode;
  style?: any;
  onPress: () => void;
};

export const TextLink = ({ children, style, onPress }: TextLinkProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress}>
      <ReactText style={[styles.text, style]} numberOfLines={1} ellipsizeMode="tail">
        {children}
      </ReactText>
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    text: {
      textDecorationLine: 'underline',
      fontWeight: 'bold',
      fontSize: 16,
      color: theme.colors.text,
    },
  });
