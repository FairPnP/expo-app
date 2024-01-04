import React, {Suspense, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {UseControllerProps, useController} from 'react-hook-form';
import {AppTheme, useTheme} from '../themes';
import DatePicker from 'react-native-date-picker';

interface DateTimePickerProps extends UseControllerProps {
  name: string;
  label?: string;
  initialDate?: Date;
}

export const DateTimePicker = (props: DateTimePickerProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [isOpen, setIsOpen] = useState(false);
  const {name, rules} = props;

  const {field} = useController({
    name,
    rules,
    defaultValue: props.initialDate || new Date(),
  });

  const handleConfirm = (date: Date) => {
    field.onChange(date);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.button}>
        <Text style={styles.text}>
          {(field.value as Date).toLocaleString()}
        </Text>
      </TouchableOpacity>
        <DatePicker
          modal
          open={isOpen}
          date={field.value}
          onConfirm={handleConfirm}
          onCancel={() => setIsOpen(false)}
        />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });
