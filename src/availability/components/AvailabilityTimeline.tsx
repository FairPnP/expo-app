// import React, {useState, useCallback} from 'react';
// import {Alert, View} from 'react-native';
// import {
//   ExpandableCalendar,
//   TimelineList,
//   CalendarProvider,
//   CalendarUtils,
//   TimelineEventProps,
// } from 'react-native-calendars';
// import {Availability} from '../api';

// export type AvailabilityTimelineProps = {
//   availabilities: Availability[];
// };

// const today = new Date();
// const getDate = (offset = 0) =>
//   CalendarUtils.getCalendarDateString(
//     new Date().setDate(today.getDate() + offset),
//   );

// export const AvailabilityTimeline = ({
//   availabilities,
// }: AvailabilityTimelineProps) => {
//   const [currentDate, setCurrentDate] = useState(getDate());
//   const [marked, setMarked] = useState<{[date: string]: {marked: boolean}}>({});

//   const onDateChanged = useCallback((date, source) => {
//     console.log('onDateChanged: ', date, source);
//     setCurrentDate(date);
//   }, []);

//   const onMonthChange = useCallback((month, updateSource) => {
//     console.log('onMonthChange: ', month, updateSource);
//   }, []);

//   const createNewEvent = (timeString, timeObject) => {
//     // const eventsByDate = {};
//     // const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
//     // const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;
//     // const newEvent = {
//     //   id: 'draft',
//     //   start: `${timeString}`,
//     //   end: `${timeObject.date} ${hourString}:${minutesString}:00`,
//     //   title: 'New Event',
//     //   color: 'white',
//     // };
//     // if (timeObject.date) {
//     //   if (eventsByDate[timeObject.date]) {
//     //     eventsByDate[timeObject.date] = [
//     //       ...eventsByDate[timeObject.date],
//     //       newEvent,
//     //     ];
//     //     setEventsByDate(eventsByDate);
//     //   } else {
//     //     eventsByDate[timeObject.date] = [newEvent];
//     //     setState({eventsByDate: {...eventsByDate}});
//     //   }
//     // }
//   };

//   const approveNewEvent = (_timeString, timeObject) => {
//     // const {eventsByDate} = state;
//     // Alert.prompt('New Event', 'Enter event title', [
//     //   {
//     //     text: 'Cancel',
//     //     onPress: () => {
//     //       if (timeObject.date) {
//     //         eventsByDate[timeObject.date] = filter(
//     //           eventsByDate[timeObject.date],
//     //           e => e.id !== 'draft',
//     //         );
//     //         setState({
//     //           eventsByDate,
//     //         });
//     //       }
//     //     },
//     //   },
//     //   {
//     //     text: 'Create',
//     //     onPress: eventTitle => {
//     //       if (timeObject.date) {
//     //         const draftEvent = find(eventsByDate[timeObject.date], {
//     //           id: 'draft',
//     //         });
//     //         if (draftEvent) {
//     //           draftEvent.id = undefined;
//     //           draftEvent.title = eventTitle ?? 'New Event';
//     //           draftEvent.color = 'lightgreen';
//     //           eventsByDate[timeObject.date] = [
//     //             ...eventsByDate[timeObject.date],
//     //           ];
//     //           setState({
//     //             eventsByDate,
//     //           });
//     //         }
//     //       }
//     //     },
//     //   },
//     // ]);
//   };

//   const fourHoursAgo = new Date(new Date().getTime() - 4 * 60 * 60 * 1000);

//   const timelineEvents = availabilities.map(a => ({
//     start: a.start_date,
//     end: a.end_date,
//     title: a.id,
//     color: 'blue',
//   }));

//   const eventsByDate: {[key: string]: TimelineEventProps[]} =
//     timelineEvents.reduce((acc, event) => {
//       const date = CalendarUtils.getCalendarDateString(event.start);
//       if (acc[date]) {
//         acc[date].push(event);
//       } else {
//         acc[date] = [event];
//       }
//       return acc;
//     }, {});

//   return (
//     <CalendarProvider
//       date={ITEMS[1]?.title}
//       // onDateChanged={onDateChanged}
//       // onMonthChange={onMonthChange}
//       showTodayButton
//       // disabledOpacity={0.6}
//       theme={todayBtnTheme.current}
//       // todayBottomMargin={16}
//     >
//       {weekView ? (
//         <WeekCalendar
//           testID={testIDs.weekCalendar.CONTAINER}
//           firstDay={1}
//           markedDates={marked.current}
//         />
//       ) : (
//         <ExpandableCalendar
//           testID={testIDs.expandableCalendar.CONTAINER}
//           // horizontal={false}
//           // hideArrows
//           // disablePan
//           // hideKnob
//           // initialPosition={ExpandableCalendar.positions.OPEN}
//           // calendarStyle={styles.calendar}
//           // headerStyle={styles.header} // for horizontal only
//           // disableWeekScroll
//           theme={theme.current}
//           // disableAllTouchEventsForDisabledDays
//           firstDay={1}
//           markedDates={marked.current}
//           leftArrowImageSource={leftArrowIcon}
//           rightArrowImageSource={rightArrowIcon}
//           // animateScroll
//           // closeOnDayPress={false}
//         />
//       )}
//       <AgendaList
//         sections={ITEMS}
//         renderItem={renderItem}
//         // scrollToNextEvent
//         sectionStyle={styles.section}
//         // dayFormat={'yyyy-MM-d'}
//       />
//     </CalendarProvider>
//   );
// };
