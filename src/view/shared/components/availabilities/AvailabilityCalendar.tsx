import {Space} from '@/api';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, CalendarProvider} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useTheme} from '@/view/theme';
import {useMyAvailabilities} from '@/state';

export type AvailabilityCalendarProps = {
  style?: any;
  space: Space;
};

export const AvailabilityCalendar = ({
  style,
  space,
}: AvailabilityCalendarProps) => {
  const theme = useTheme().theme.appTheme;
  const {data: availabilities} = useMyAvailabilities();

  const markedDates = useMemo(() => {
    const markers: MarkedDates = {};
    for (const availability of availabilities.availability) {
      const startDate = new Date(availability.start_date);
      const endDate = new Date(availability.end_date);
      const startDay = startDate.toISOString().slice(0, 10);
      const endDay = endDate.toISOString().slice(0, 10);
      if (startDay === endDay) {
        markers[startDay] = {
          color: theme.colors.primary,
          textColor: theme.colors.text,
          startingDay: true,
          endingDay: true,
        };
      } else {
        markers[startDay] = {
          color: theme.colors.primary,
          textColor: theme.colors.text,
          startingDay: true,
        };
        markers[endDay] = {
          color: theme.colors.primary,
          textColor: theme.colors.text,
          endingDay: true,
        };

        const daysBetween = Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        for (let i = 1; i < daysBetween; i++) {
          const day = new Date(startDate);
          day.setDate(day.getDate() + i);
          const dayString = day.toISOString().slice(0, 10);
          markers[dayString] = {
            color: theme.colors.primary,
            textColor: theme.colors.text,
          };
        }
      }
    }
    return markers;
  }, [space.id, theme.colors.primary, theme.colors.text, availabilities]);

  return (
    <View style={[styles.container, style]}>
      <CalendarProvider date={''}>
        <Calendar
          horizontal={true}
          markingType="period"
          markedDates={markedDates}
          minDate={new Date().toDateString()}
          // dayComponent={renderDayComponent as any}
        />
      </CalendarProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
