import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  Title,
  Text,
  Button,
  AvailabilityOptions,
  AvailabilityOptionsPicker,
  AvailabilityDatePicker,
  Section,
} from '@/view/shared';
import {toDateTimeString, toDollarString} from '@/utils';
import {Building, Space} from '@/api';
import {useTheme, AppTheme} from '@/view/theme';
import {useCreateAvailability} from '@/state';
import {ImageSwiper} from '@/view/shared/components/common/ImageSwiper';
import {SafeAreaView} from 'react-native-safe-area-context';

export type ViewSpotScreenProps = {
  building: Building;
  space: Space;
};

export const ViewSpotScreen = ({navigation, route}) => {
  const {building, space} = route.params as ViewSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const [isWhenSectionOpen, setIsWhenSectionOpen] = useState(true);
  const [isOptionsSectionOpen, setIsOptionsSectionOpen] = useState(false);
  const {mutateAsync: createAvailability} = useCreateAvailability();

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
    setSelectedDateRange({startDate, endDate});
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
      <SafeAreaView style={styles.headerArea}>
        <Button onPress={() => navigation.goBack()}>
          <Text>{'<'}</Text>
        </Button>
      </SafeAreaView>
      <ImageSwiper urls={space.img_urls} />
      <View style={styles.contentArea}>
        <Section title={space.name}>
          <Title>{building.name}</Title>
          <Text>{space.description}</Text>
        </Section>
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      zIndex: 1,
    },
    contentArea: {
      flex: 1,
      padding: 16,
    },
  });
