import React, {forwardRef} from 'react';
import {View, Text, TextInput as RNTextInput, StyleSheet} from 'react-native';
import {useController, UseControllerProps} from 'react-hook-form';
import {AppTheme, useTheme} from '../themes';

interface NumberInputProps extends UseControllerProps {
  label: string;
  name: string;
}

export const NumberInput = forwardRef<RNTextInput, NumberInputProps>(
  (props, ref) => {
    const theme = useTheme().theme.appTheme;
    const styles = getStyles(theme);

    const {name, label, rules, ...inputProps} = props;

    const {field, fieldState} = useController({name, rules});

    const hasError = fieldState.invalid;

    const handleInputChange = (text: string) => {
      const numericValue = text.replace(/[^0-9.]/g, '');
      field.onChange(numericValue);
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RNTextInput
          style={[styles.input, hasError && styles.errorInput]}
          onChangeText={handleInputChange}
          onBlur={field.onBlur}
          value={field.value}
          keyboardType="numeric"
          ref={ref}
          {...inputProps}
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
  },
);

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: -1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: theme.colors.card,
    },
    label: {
      color: theme.colors.text,
      margin: 20,
      marginLeft: 0,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      color: theme.colors.text,
      height: 40,
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
