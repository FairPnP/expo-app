import {calendarDate} from '@/utils';
import React, {useState, useMemo, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';

export type DayViewProps = {
  onDateRangeSelected?: (startDate: Date, endDate: Date) => void;
};

type State = {
  startDate?: Date;
  endDate?: Date;
};

export const DaysView = ({onDateRangeSelected}: DayViewProps) => {
  const initialDate = useMemo(() => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return calendarDate(date);
  }, []);

  const [state, setState] = useState<State>({});

  const marked = useMemo(() => {
    if (!state.startDate || !state.endDate) {
      return {};
    }

    const markedDates = {};
    const startDate = calendarDate(state.startDate);
    const endDate = calendarDate(state.endDate);
    const currentDate = new Date(state.startDate);
    while (currentDate.getTime() <= state.endDate.getTime()) {
      const dateStr = calendarDate(currentDate);
      markedDates[dateStr] = {
        selected: true,
        selectedColor: '#2E66E7',
        color: '#2E66E7',
        startingDay: dateStr === startDate,
        endingDay: dateStr === endDate,
      };
      currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }

    return markedDates;
  }, [state.startDate, state.endDate]);

  const onDayPress = useCallback(
    (day: DateData) => {
      const date = new Date(day.dateString);
      if (state.startDate && !state.endDate) {
        if (date.getTime() < state.startDate.getTime()) {
          setState({startDate: date});
        } else {
          setState({startDate: state.startDate, endDate: date});
          onDateRangeSelected?.(state.startDate, date);
        }
      } else {
        setState({startDate: date});
      }
    },
    [state.startDate, state.endDate],
  );

  return (
    <CalendarList
      current={initialDate}
      pastScrollRange={0}
      futureScrollRange={11}
      onDayPress={onDayPress}
      markingType="period"
      markedDates={marked}
      calendarWidth={Dimensions.get('window').width - 32}
      calendarHeight={300}
    />
  );
};
