import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useController} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {AppTheme, useTheme} from '@/view/theme';

interface DateTimePickerProps {
  name: string;
}

export const DateTimePicker = ({name}: DateTimePickerProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [isOpen, setIsOpen] = useState(false);

  const {field} = useController({name});

  const handleConfirm = (date: Date) => {
    field.onChange(date);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.button}>
        <Text style={styles.text}>{field.value.toLocaleString()}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={isOpen}
        date={field.value}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        minuteInterval={15}
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
