import React, {forwardRef, useEffect, useState} from 'react';
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

    const [inputValue, setInputValue] = useState(field.value.toString());
    const hasError = fieldState.invalid;

    useEffect(() => {
      setInputValue(field.value.toString());
    }, [field.value]);

    const handleInputChange = (text: string) => {
      const numericValue = text.replace(/[^0-9.]/g, '');
      setInputValue(numericValue);
    };

    const handleBlur = () => {
      const numericValue = inputValue === '' ? 0 : parseFloat(inputValue);
      field.onChange(numericValue);
      field.onBlur();
    };

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RNTextInput
          style={[styles.input, hasError && styles.errorInput]}
          onChangeText={handleInputChange}
          onBlur={handleBlur}
          value={inputValue}
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
