export const calendarDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const friendlyDateRange = (start: Date, end: Date) => {
  // get diff
  const diff = (end.getTime() - start.getTime()) / 1000;

  // show 1y 2d 7h 5m 3s
  const years = Math.floor(diff / 31536000);
  const days = Math.floor((diff % 31536000) / 86400);
  const hours = Math.floor(((diff % 31536000) % 86400) / 3600);
  const minutes = Math.floor((((diff % 31536000) % 86400) % 3600) / 60);
  const seconds = (((diff % 31536000) % 86400) % 3600) % 60;

  const str = [];
  if (years > 0) {
    str.push(`${years}y`);
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
