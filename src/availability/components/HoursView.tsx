import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';
import {AppTheme, DateTimePicker, NumberInput, useTheme} from '@/common';

export type HoursViewProps = {
  onDateRangeSelected?: (startDate: Date, endDate: Date) => void;
};

type FormValues = {
  date: Date;
  hours: number;
};

export const HoursView = ({onDateRangeSelected}: HoursViewProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      date: new Date(),
      hours: 4,
    },
    mode: 'onChange',
  });
  const {setValue} = formMethods;

  const quickHours = [4, 8, 12, 24];

  const onQuickSelect = hours => {
    setValue('hours', hours);
  };

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        <DateTimePicker name="date" label="Date" />
        <NumberInput name="hours" label="Hours" />

        <View style={styles.quickSelectContainer}>
          {quickHours.map(hour => (
            <TouchableOpacity
              key={hour}
              style={styles.quickSelectButton}
              onPress={() => onQuickSelect(hour)}>
              <Text style={styles.quickSelectText}>{hour}h</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </FormProvider>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 300,
      padding: 16,
    },
    quickSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 16,
    },
    quickSelectButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      padding: 8,
    },
    quickSelectText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    submitButtonText: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });
