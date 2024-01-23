import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppTheme, useTheme} from '@/view/theme';
import {FontAwesome5} from '@expo/vector-icons';

export type IconButtonProps = {
  style?: any;
  onPress: () => void;
  icon: string;
  text: string;
};

export const IconButton = ({icon, text, onPress, style}: IconButtonProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <FontAwesome5 name={icon} size={24} color="#6e6e6e" style={styles.icon} />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      width: '100%',
      backgroundColor: theme.colors.card,
    },
    buttonText: {
      fontSize: 20,
      color: theme.colors.text,
    },
    icon: {
      width: 36,
      marginHorizontal: 10,
      color: theme.colors.text,
    },
  });
