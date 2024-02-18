import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  Title,
  Text,
  Button,
  AvailabilityOptions,
  AvailabilityOptionsPicker,
  AvailabilityDatePicker,
  SpaceCard,
  LoadingOverlay,
} from '@/view/shared';
import { toDateTimeString, toDollarString } from '@/utils';
import { Building, Space } from '@/api';
import { useTheme, AppTheme } from '@/view/theme';
import { useCreateAvailability } from '@/state';
import { ImageSwiper } from '@/view/shared/components/common/ImageSwiper';

// ====================================================
// OLD FOR REFERENCING
// ====================================================

export type ManageSpotScreenProps = {
  building: Building;
  space: Space;
};

export const ManageSpotScreen = ({ navigation, route }) => {
  const { building, space } = route.params as ManageSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const [isWhenSectionOpen, setIsWhenSectionOpen] = useState(true);
  const [isOptionsSectionOpen, setIsOptionsSectionOpen] = useState(false);
  const { mutateAsync: createAvailability, isPending } = useCreateAvailability();

  // State for date range and options
  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  const later = new Date(today);
  later.setHours(later.getHours() + 4);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: today,
    endDate: later,
  });
  const [options, setOptions] = useState<AvailabilityOptions>({
    hourlyRate: '1',
    minHours: '1',
  });

  const onCardPressed = (section: string) => {
    if (section === 'when') {
      setIsWhenSectionOpen(!isWhenSectionOpen);
      setIsOptionsSectionOpen(false);
    } else if (section === 'options') {
      setIsWhenSectionOpen(false);
      setIsOptionsSectionOpen(!isOptionsSectionOpen);
    }
  };

  const onDateRangeSelected = (startDate, endDate) => {
    setSelectedDateRange({ startDate, endDate });
  };

  const onSubmit = useCallback(async () => {
    await createAvailability({
      space_id: space.id,
      start_date: selectedDateRange.startDate.toISOString().slice(0, 19),
      end_date: selectedDateRange.endDate.toISOString().slice(0, 19),
      hourly_rate: +options.hourlyRate,
      // min_hours: options.minHours,
    });

    navigation.goBack();
  }, [space.id, selectedDateRange, options]);

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isPending} />
      <View style={styles.imageContainer}>
        <SpaceCard building={building} space={space} style={styles.spaceCard} />
      </View>
      <View style={styles.separator} />
      <Title>Add Availability</Title>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onCardPressed('when')}>
          <Title>When</Title>
          <View style={styles.cardTextContainer}>
            <Text>From: {toDateTimeString(selectedDateRange.startDate)}</Text>
            <Text>To: {toDateTimeString(selectedDateRange.endDate)}</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={!isWhenSectionOpen}>
          <AvailabilityDatePicker onDateRangeSelected={onDateRangeSelected} />
        </Collapsible>
      </View>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onCardPressed('options')}>
          <Title>Options</Title>
          <Text>Hourly Rate: {toDollarString(options.hourlyRate)}</Text>
          <Text>Minimum Hours: {options.minHours.toString()}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={!isOptionsSectionOpen}>
          <AvailabilityOptionsPicker onOptionsChanged={setOptions} />
        </Collapsible>
      </View>

      <View style={styles.bottomArea}>
        <Button onPress={onSubmit}>
          <Text>Add Availability</Text>
        </Button>
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      alignItems: 'center',
    },
    spaceCard: {
      width: '100%',
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      marginVertical: 8,
    },
    card: {
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      marginVertical: 8,
    },
    cardTextContainer: {
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomArea: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
  });
