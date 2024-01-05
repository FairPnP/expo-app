export const calendarDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};
