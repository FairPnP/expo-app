export const toCalendarDateString = (date: Date) => {
  const year = date.getFullYear(); // Gets the full year (e.g., 2024)
  const month = date.getMonth() + 1; // getMonth() returns month index (0-11), so add 1
  const day = date.getDate(); // Gets the day of the month (1-31)

  // Pad the month and day with a leading zero if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Combine the parts into a YYYY-MM-DD formatted string
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
};

export const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures two digits
  const day = date.getDate().toString().padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const seconds = date.getSeconds().toString().padStart(2, '0');

  const isoLikeDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  return isoLikeDate;
};

// expects YYYY-MM-DD
export const parseDateAsLocal = (date: string) => {
  const [year, month, day] = date.split('-').map(part => parseInt(part));
  return new Date(year, month - 1, day);
};

export const toISODateUTC = (date: Date) => {
  return date.toISOString().substring(0, 19);
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

export const calendarColors = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FFFF33', // Yellow
  '#FF33FF', // Magenta
  '#33FFFF', // Cyan
  '#FF5733', // Red-Orange
  '#8B00FF', // Violet
  '#00FFFF', // Aqua
  '#FF007F', // Rose
  '#00FF7F', // Spring Green
  '#FF7F00', // Orange
  '#7F00FF', // Purple
  '#7FFF00', // Chartreuse
  '#007FFF', // Azure
  '#FF7F7F', // Pale Red
];
