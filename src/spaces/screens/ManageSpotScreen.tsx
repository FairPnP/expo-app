import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import {Building} from '@/buildings';
import {Space, SpaceCard} from '@/spaces';
import {
  AppTheme,
  useTheme,
  Title,
  NumberInput,
  DateTimePicker,
  Button,
} from '@/common';
import {
  Availability,
  AvailabilityAPI,
  AvailabilityCalendar,
  AvailabilityTimeline,
} from '@/availability';

export type ManageSpotScreenProps = {
  building: Building;
  space: Space;
};

type FormValues = {
  hourlyRate: string;
  startDate: Date;
  endDate: Date;
};

export const ManageSpotScreen = ({navigation, route}) => {
  const {building, space} = route.params as ManageSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  const later = new Date(today);
  later.setHours(later.getHours() + 4);
  const formMethods = useForm<FormValues>({
    defaultValues: {
      hourlyRate: '1',
      startDate: today,
      endDate: later,
    },
  });

  const onSubmit = data => {
    AvailabilityAPI.create({
      space_id: space.id,
      start_date: data.startDate.toISOString().slice(0, 19),
      end_date: data.endDate.toISOString().slice(0, 19),
      hourly_rate: parseFloat(data.hourlyRate),
    }).then(() => {
      // Handle response
      navigation.navigate('Home');
    });
  };

  const getAvailabilities = useCallback(async () => {
    const availabilitiesResponse = await AvailabilityAPI.list({
      space_id: space.id,
    });

    setAvailabilities(availabilitiesResponse.availability);
  }, [space]);

  useEffect(() => {
    getAvailabilities();
  }, [getAvailabilities]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <SpaceCard style={styles.spaceCard} building={building} space={space} />
      </View>
      <View style={styles.separator} />
      {/* <ScrollView style={styles.scollView}> */}
      <Title>Availability</Title>
      <AvailabilityTimeline availabilities={availabilities} />
      {/* <FormProvider {...formMethods}>
          <NumberInput name="hourlyRate" label="Hourly Rate" />
          <DateTimePicker name="startDate" label="Start Date/Time" />
          <DateTimePicker name="endDate" label="End Date/Time" />
          <View style={styles.separator} />
          <Button onPress={formMethods.handleSubmit(onSubmit)}>
            Add Availability
          </Button>
        </FormProvider> */}
      {/* </ScrollView> */}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 8,
      flex: 1,
    },
    infoContainer: {
      padding: 8,
      alignItems: 'center',
    },
    spaceCard: {
      width: '100%',
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    scollView: {
      // flex: 1,
    },
  });
