import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useTheme} from '@/view/theme';
import {Availability} from '@/api';
import {toCalendarDateString} from '@/utils';

export type AvailabilityCalendarProps = {
  style?: any;
  availabilities: Availability[];
  onDayPress?: (day: string, availabilities: Availability[]) => void;
};

export const AvailabilityCalendar = ({
  style,
  availabilities,
  onDayPress,
}: AvailabilityCalendarProps) => {
  const theme = useTheme().theme.appTheme;
  const [selectedDate, setSelectedDate] = useState<string>(undefined);

  const markedDates = useMemo(() => {
    const markers: MarkedDates = {};
    if (!availabilities) return markers;

    for (const availability of availabilities) {
      const startDate = new Date(availability.start_date);
      const endDate = new Date(availability.end_date);
      const startDay = toCalendarDateString(startDate);
      const endDay = toCalendarDateString(endDate);
      if (startDay === endDay) {
        markers[startDay] = {
          periods: [
            {
              color: theme.colors.primary,
              startingDay: true,
              endingDay: true,
            },
          ],
        };
      } else {
        markers[startDay] = {
          periods: [
            {
              color: theme.colors.primary,
              startingDay: true,
            },
          ],
        };
        markers[endDay] = {
          periods: [
            {
              color: theme.colors.primary,
              endingDay: true,
            },
          ],
        };

        const daysBetween = Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        for (let i = 1; i < daysBetween; i++) {
          const day = new Date(startDate);
          day.setDate(day.getDate() + i);
          const dayString = toCalendarDateString(day);
          markers[dayString] = {
            periods: [{color: theme.colors.primary}],
          };
        }
      }
    }

    if (selectedDate) {
      if (!markers[selectedDate]) {
        markers[selectedDate] = {
          selected: true,
        };
      } else {
        markers[selectedDate].selected = true;
      }
    }
    return markers;
  }, [availabilities, selectedDate]);

  const onDayPressCb = ({dateString}) => {
    setSelectedDate(dateString);
    const date = new Date(dateString);
    const a = availabilities?.filter(
      availability =>
        toCalendarDateString(availability.start_date) === dateString ||
        toCalendarDateString(availability.end_date) === dateString ||
        (date >= availability.start_date && date <= availability.end_date),
    );
    onDayPress?.(dateString, a);
  };

  useEffect(() => {
    const date = toCalendarDateString(new Date());
    console.log(date);
    onDayPressCb({dateString: date});
  }, [availabilities]);

  return (
    <View style={[styles.container, style]}>
      <Calendar
        horizontal={true}
        markingType="multi-period"
        markedDates={markedDates}
        allowSelectionOutOfRange={true}
        minDate={new Date().toDateString()}
        onDayPress={onDayPressCb}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
