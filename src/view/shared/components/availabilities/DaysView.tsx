import {toCalendarDateString} from '@/utils';
import React, {useMemo, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import {create} from 'zustand';

export type DayViewProps = {
  onDateRangeSelected?: (startDate: Date, endDate: Date) => void;
};

type DaysViewState = {
  startDate?: Date;
  endDate?: Date;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
};

const useDaysViewState = create<DaysViewState>(set => ({
  startDate: undefined,
  endDate: undefined,
  setStartDate: (startDate: Date) => set({startDate}),
  setEndDate: (endDate: Date) => set({endDate}),
}));

export const DaysView = ({onDateRangeSelected}: DayViewProps) => {
  const initialDate = useMemo(() => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return toCalendarDateString(date);
  }, []);

  const state = useDaysViewState();

  const marked = useMemo(() => {
    if (!state.startDate || !state.endDate) {
      return {};
    }

    const markedDates = {};
    const startDate = toCalendarDateString(state.startDate);
    const endDate = toCalendarDateString(state.endDate);
    const currentDate = new Date(state.startDate);
    while (currentDate.getTime() <= state.endDate.getTime()) {
      const dateStr = toCalendarDateString(currentDate);
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
      const utc = new Date(day.dateString);
      const date = new Date(utc.getTime() + utc.getTimezoneOffset() * 60000);
      if (state.startDate && !state.endDate) {
        if (date.getTime() < state.startDate.getTime()) {
          state.setStartDate(date);
        } else {
          state.setEndDate(date);
          onDateRangeSelected?.(state.startDate, date);
        }
      } else {
        state.setStartDate(date);
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
