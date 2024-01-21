import React, {forwardRef} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useController, UseControllerProps} from 'react-hook-form';
import {AppTheme, useTheme} from '@/view/theme';

interface SwitchInputProps extends UseControllerProps {
  label: string;
  name: string;
}

export const SwitchInput = forwardRef<any, SwitchInputProps>((props, ref) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {name, label, rules} = props;

  const {field, fieldState} = useController({name, rules});

  const hasError = fieldState.invalid;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{false: theme.colors.border, true: theme.colors.primary}}
        thumbColor={theme.colors.card}
        ios_backgroundColor={theme.colors.border}
        onValueChange={field.onChange}
        value={field.value}
        ref={ref}
      />
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>
            {fieldState.error?.message as string}
          </Text>
        </View>
      )}
    </View>
  );
});

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: -1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 8,
      backgroundColor: theme.colors.background,
    },
    label: {
      color: theme.colors.text,
      flex: 1,
    },
    errorContainer: {
      flex: -1,
      height: 25,
      justifyContent: 'center',
    },
    error: {
      color: theme.colors.error,
    },
  });
