import React, { forwardRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
} from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import { AppTheme, useTheme } from '@/view/theme';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  bottomSheet?: boolean;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, _) => {
    const theme = useTheme().theme.appTheme;
    const styles = getStyles(theme);

    const { name, label, rules, bottomSheet, ...inputProps } = props;

    const { field, fieldState } = useController({ name, rules });

    const hasError = fieldState.invalid;

    return (
      <View style={styles.container}>
        {label && (
          <Text style={styles.label} accessibilityLabel={label}>
            {label}
          </Text>
        )}
        {bottomSheet ? (
          <BottomSheetTextInput
            autoCapitalize="none"
            textAlign="left"
            style={[styles.input, hasError && styles.errorInput]}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholderTextColor={theme.colors.disabled}
            {...inputProps}
          />
        ) : (
          <RNTextInput
            autoCapitalize="none"
            textAlign="left"
            style={[styles.input, hasError && styles.errorInput]}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholderTextColor={theme.colors.disabled}
            {...inputProps}
          />
        )}

        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {fieldState.error?.message as string}
            </Text>
          </View>
        )}
      </View>
    );
  },
);

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    label: {
      color: theme.colors.text,
      marginBottom: 8,
    },
    container: {
      height: 100,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: theme.colors.background,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      color: theme.colors.text,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
    },
    errorInput: {
      borderColor: theme.colors.error,
    },
    errorContainer: {
      flex: -1,
      height: 25,
    },
    error: {
      color: theme.colors.error,
    },
  });
