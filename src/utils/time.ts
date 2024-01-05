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
