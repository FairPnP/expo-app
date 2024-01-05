export const calendarDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const friendlyDateRange = (start: Date, end: Date) => {
  // get diff
  const diff = end.getTime() - start.getTime();

  // show 1y 3m 2d 7h 5m 3s
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  const str = [];
  if (years > 0) {
    str.push(`${years}y`);
  }
  if (months > 0) {
    str.push(`${months}m`);
  }
  if (days > 0) {
    str.push(`${days}d`);
  }
  if (hours > 0) {
    str.push(`${hours}h`);
  }
  if (minutes > 0) {
    str.push(`${minutes}m`);
  }
  if (seconds > 0) {
    str.push(`${seconds}s`);
  }
  return str.join(' ');
};
