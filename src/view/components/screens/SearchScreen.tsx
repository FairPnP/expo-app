import React, {Suspense, useCallback, useState} from 'react';
import {StyleSheet, View, Platform, KeyboardAvoidingView} from 'react-native';
import {
  AppTheme,
  Button,
  HorizontalGroup,
  useTheme,
  Text,
  DateTimePicker,
} from '@/common';
import {AvailabilityMap, MapsSearch} from '@/buildings';
import {useLocationPermission} from '@/common/hooks/useLocationPermission';
import {LatLng} from 'react-native-maps';
import {FormProvider, useForm} from 'react-hook-form';

type FormValues = {
  startDate: Date;
  endDate: Date;
};

export const SearchScreen = () => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  const later = new Date(today);
  later.setHours(later.getHours() + 4);

  const formMethods = useForm<FormValues>({
    defaultValues: {
      startDate: today,
      endDate: later,
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<LatLng>(null);
  useLocationPermission();

  const onLocationSelected = useCallback((data, details) => {
    setSelectedLocation({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.topBar}>
        <FormProvider {...formMethods}>
          <HorizontalGroup>
            <Text>Start:</Text>
            <DateTimePicker
              name="startDate"
              label="Select Start Date"
              initialDate={today}
            />
          </HorizontalGroup>
          <HorizontalGroup>
            <Text>End:</Text>
            <DateTimePicker
              name="endDate"
              label="Select End Date"
              initialDate={later}
            />
          </HorizontalGroup>
        </FormProvider>
        <MapsSearch onLocationSelected={onLocationSelected} />
      </View>
      <View style={styles.map}>
        <AvailabilityMap
          startDate={formMethods.watch('startDate')}
          endDate={formMethods.watch('endDate')}
          selectedLocation={selectedLocation}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topBar: {
      padding: 10,
      backgroundColor: theme.colors.background,
    },
    map: {
      flex: 1,
      zIndex: -1,
    },
  });
