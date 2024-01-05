import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Building} from '@/buildings';
import {AppTheme, useTheme, Title} from '@/common';
import {
  AvailabilityDatePicker,
  AvailabilityOptions,
  AvailabilityOptionsPicker,
} from '@/availability';
import {Space, SpaceCard} from '@/spaces';
import {toDateTimeString, toDollarString} from '@/utils';

export type ManageSpotScreenProps = {
  building: Building;
  space: Space;
};

export const ManageSpotScreen = ({route}) => {
  const {building, space} = route.params as ManageSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  // const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [isWhenSectionOpen, setIsWhenSectionOpen] = useState(true);
  const [isOptionsSectionOpen, setIsOptionsSectionOpen] = useState(false);

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

  // const getAvailabilities = useCallback(async () => {
  //   const availabilitiesResponse = await AvailabilityAPI.list({
  //     space_id: space.id,
  //   });
  //   setAvailabilities(availabilitiesResponse.availability);
  // }, [space.id]);

  // useEffect(() => {
  //   getAvailabilities();
  // }, [getAvailabilities]);

  const onDateRangeSelected = (startDate, endDate) => {
    console.log('onDateRangeSelected', startDate, endDate);
    setSelectedDateRange({startDate, endDate});
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <SpaceCard style={styles.spaceCard} building={building} space={space} />
      </View>
      <View style={styles.separator} />
      <View style={styles.card}>
        <TouchableOpacity onPress={() => onCardPressed('when')}>
          <Title>When</Title>
          <View style={styles.cardTextContainer}>
            <Text>From: {toDateTimeString(selectedDateRange.startDate)}</Text>
            <Text>To: {toDateTimeString(selectedDateRange.endDate)}</Text>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={!isWhenSectionOpen}>
          <AvailabilityDatePicker
            availabilities={[]}
            initialDateRange={[
              selectedDateRange.startDate,
              selectedDateRange.endDate,
            ]}
            onDateRangeSelected={onDateRangeSelected}
          />
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
  });
