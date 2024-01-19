import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';
import {DateTimePicker, NumberInput} from '../common';
import {useTheme, AppTheme} from '@/view/theme';

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

  const today = new Date();
  today.setHours(today.getHours() + 1, 0, 0, 0);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      date: today,
      hours: 4,
    },
    mode: 'onChange',
  });
  const {setValue, watch} = formMethods;
  const {date, hours} = watch();

  useEffect(() => {
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + hours);
    onDateRangeSelected?.(date, endDate);
  }, [date, hours]);

  const quickHours = [4, 8, 12, 24];
  const onQuickSelect = hours => {
    setValue('hours', hours);
  };

  const infoMessage = useCallback(() => {
    if (date && hours) {
      // if date is today, just say today
      const today = new Date();
      const dateStr =
        today.toDateString() === date.toDateString()
          ? 'today'
          : `${date.toDateString()}`;

      const timeStr = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      return (
        <Text style={styles.messageText}>
          Starting {dateStr} at {timeStr} for {hours} hours
        </Text>
      );
    }
    return null;
  }, [date, hours]);

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        <View style={styles.dateArea}>
          <Text>Start Date</Text>
          <DateTimePicker name="date" />
        </View>
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
        <View style={styles.messageArea}>{infoMessage()}</View>
      </View>
    </FormProvider>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    dateArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quickSelectContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 8,
    },
    quickSelectButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    quickSelectText: {
      color: theme.colors.text,
      fontSize: 18,
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
    messageArea: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    messageText: {
      textAlign: 'center',
      fontSize: 18,
    },
  });
