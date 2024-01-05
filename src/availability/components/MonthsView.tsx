import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useForm, FormProvider} from 'react-hook-form';
import {AppTheme, DateTimePicker, NumberInput, useTheme} from '@/common';

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
  const formMethods = useForm<FormValues>({
    defaultValues: {
      startDate: new Date(),
      durationMonths: 1,
    },
    mode: 'onChange',
  });

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        <DateTimePicker name="startDate" label="Start Date" />
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
  });
