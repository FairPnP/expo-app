import React, {useEffect, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {MarkedDates} from 'react-native-calendars/src/types';
import {useTheme} from '@/view/theme';
import {Availability} from '@/api';
import {calendarColors, parseDateAsLocal, toCalendarDateString} from '@/utils';

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
    if (!availabilities) return {};

    const markers = {};
    const dayInMillis = 1000 * 60 * 60 * 24; // number of milliseconds in a day

    let idx = 0;
    for (const availability of availabilities) {
      const startDate = new Date(availability.start_date);
      const endDate = new Date(availability.end_date);
      const startDay = toCalendarDateString(startDate);
      const endDay = toCalendarDateString(endDate);
      const color = calendarColors[idx++ % calendarColors.length];

      if (startDay === endDay) {
        const period = {color, startingDay: true, endingDay: true};
        markers[startDay] = markers[startDay] || {periods: []};
        markers[startDay].periods.push(period);
      } else {
        markers[startDay] = markers[startDay] || {periods: []};
        markers[startDay].periods.push({color, startingDay: true});

        markers[endDay] = markers[endDay] || {periods: []};
        markers[endDay].periods.push({color, endingDay: true});

        let currentDate = new Date(startDate.getTime() + dayInMillis);
        while (currentDate < endDate) {
          const dayString = toCalendarDateString(currentDate);
          if (dayString !== startDay && dayString !== endDay) {
            markers[dayString] = markers[dayString] || {periods: []};
            markers[dayString].periods.push({color});
          }
          currentDate = new Date(currentDate.getTime() + dayInMillis);
        }
      }
    }

    if (selectedDate) {
      markers[selectedDate] = markers[selectedDate] || {selected: false};
      markers[selectedDate].selected = true;
    }

    return markers;
  }, [availabilities, selectedDate, calendarColors]);

  const onDayPressCb = ({dateString}) => {
    setSelectedDate(dateString);
    const date = new Date(parseDateAsLocal(dateString));
    const a = availabilities?.filter(
      availability =>
        toCalendarDateString(availability.start_date) === dateString ||
        toCalendarDateString(availability.end_date) === dateString ||
        (date >= availability.start_date && date <= availability.end_date),
    );
    onDayPress?.(dateString, a);
  };

  useEffect(() => {
    let date = selectedDate;
    if (!date) {
      date = toCalendarDateString(new Date());
    }
    onDayPressCb({dateString: date});
    // this also handles refresh when availabilities change
  }, [availabilities, selectedDate]);

  let width = Math.round(Dimensions.get('window').width);

  return (
    <View style={[styles.container, {width: width}, style]}>
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
  container: {alignSelf: 'center'},
});
