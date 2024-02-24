import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { AppTheme, useTheme } from '@/view/theme';
import { FontAwesome5 } from '@expo/vector-icons';

export type IconButtonProps = {
  style?: any;
  onPress: () => void;
  icon?: string;
  iconComponent?: React.ReactNode;
  text: string;
};

export const IconButton = ({ icon, text, onPress, style, iconComponent }: IconButtonProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <View style={styles.icon}>
        {iconComponent ? iconComponent :
          <FontAwesome5 name={icon} size={24} color={theme.colors.text} />
        }
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      width: '100%',
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
