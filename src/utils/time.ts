export const toDollarString = (amount: number | string) => {
  if (amount === undefined) {
    return '';
  }

  if (typeof amount === 'string') {
    if (amount.endsWith('.')) {
      amount = amount.slice(0, -1);
    }
    amount = parseFloat(amount);
  }
  return `$${amount.toFixed(2)}`;
};

export const toTimeString = (date: Date) => {
  return date.toISOString().split('T')[1].slice(0, 5);
};

export const toDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const toDateTimeString = (date: Date) => {
  return `${toDateString(date)} ${toTimeString(date)}`;
};

export const toMonthYearString = (date: Date) => {
  return (
    date.toLocaleString('default', {month: 'long'}) + ' ' + date.getFullYear()
  );
};

export const toMinimalTimeString = (date: Date) => {
  if (date.getMinutes() === 0) {
    return date.toLocaleString('en-US', {hour: 'numeric', hour12: true});
  }

  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const toMinimalDateString = (date: Date) => {
  return date.toLocaleString('en-US', {month: 'short', day: 'numeric'});
};

export const toMinimalDateRange = (start: Date, end: Date) => {
  const isSameDay = start.toDateString() === end.toDateString();

  // Jan 5, 2 PM - 4 PM
  if (isSameDay) {
    return `${toMinimalDateString(start)}, ${toMinimalTimeString(start)} - ${toMinimalTimeString(end)}`;
  }

  // Jan 5, 2 PM - Jan 6, 4:30 PM
  return `${toMinimalDateString(start)}, ${toMinimalTimeString(start)} - ${toMinimalDateString(end)}, ${toMinimalTimeString(end)}`;
};
