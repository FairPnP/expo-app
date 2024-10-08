import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';
import {AppTheme, useTheme} from '@/view/theme';
import {DateTimePicker, NumberInput, Text} from '../common';

export type MonthsViewProps = {
  onDateRangeSelected?: (startDate: Date, endDate: Date) => void;
};

type FormValues = {
  startDate: Date;
  durationMonths: number;
};

export const MonthsView = ({onDateRangeSelected}: MonthsViewProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      startDate: tomorrow,
      durationMonths: 1,
    },
    mode: 'onChange',
  });
  const {startDate, durationMonths} = formMethods.watch();

  useEffect(() => {
    if (startDate && durationMonths) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + durationMonths);
      onDateRangeSelected?.(startDate, endDate);
    }
  }, [startDate, durationMonths]);

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        <View style={styles.dateArea}>
          <Text>Start Date</Text>
          <DateTimePicker name="startDate" />
        </View>
        <NumberInput name="durationMonths" label="Duration (Months)" />
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
    dateArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
