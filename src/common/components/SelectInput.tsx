import React, {forwardRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useController, UseControllerProps} from 'react-hook-form';
import {AppTheme, useTheme} from '../themes';

interface SelectInputProps extends UseControllerProps {
  label: string;
  name: string;
  items: {label: string; value: string | number}[];
  defaultValue?: string | number;
}

export const SelectInput = forwardRef<any, SelectInputProps>((props, ref) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {name, label, items, rules, ...inputProps} = props;

  const {field, fieldState} = useController({
    name,
    rules,
    defaultValue: props.defaultValue,
  });

  const hasError = fieldState.invalid;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label} accessibilityLabel={label}>
          {label}
        </Text>
      )}
      <View style={[styles.input, hasError && styles.errorInput]}>
        <Picker
          selectedValue={field.value}
          onValueChange={field.onChange}
          ref={ref}
          style={styles.picker}
          dropdownIconColor={theme.colors.text}
          {...inputProps}>
          {items.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

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
    label: {
      color: theme.colors.text,
      marginBottom: 8,
    },
    container: {
      flex: -1,
      justifyContent: 'center',
      padding: 8,
      backgroundColor: theme.colors.background,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
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
    picker: {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
    },
  });
