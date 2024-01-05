import {View} from 'react-native';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {NumberInput} from '@/common';

export type AvailabilityOptionsPickerProps = {
  initialOptions?: AvailabilityOptions;
  onOptionsChanged: (options: AvailabilityOptions) => void;
};

export type AvailabilityOptions = {
  hourlyRate: string;
  minHours: string;
};

export const AvailabilityOptionsPicker = ({
  initialOptions,
  onOptionsChanged,
}: AvailabilityOptionsPickerProps) => {
  const formMethods = useForm<AvailabilityOptions>({
    defaultValues: initialOptions || {hourlyRate: '1', minHours: '1'},
  });

  const {watch} = formMethods;
  const watchedHourlyRate = watch('hourlyRate');
  const watchedMinHours = watch('minHours');

  useEffect(() => {
    if (watchedHourlyRate !== undefined && watchedMinHours !== undefined) {
      onOptionsChanged({
        hourlyRate: watchedHourlyRate,
        minHours: watchedMinHours,
      });
    }
  }, [watchedHourlyRate, watchedMinHours, onOptionsChanged]);

  return (
    <View>
      <FormProvider {...formMethods}>
        <NumberInput
          name="hourlyRate"
          label="Hourly Rate"
          rules={{
            required: 'Hourly rate is required',
            min: {
              value: 1,
              message: 'must be at least $1',
            },
          }}
        />
        <NumberInput
          name="minHours"
          label="Minimum Hours"
          rules={{
            required: 'Minimum hours is required',
            min: {
              value: 1,
              message: 'must be at least 1',
            },
          }}
        />
      </FormProvider>
    </View>
  );
};
