export * from './dtos';
export * from './service';

export const getAvailabilityCost = (
  hourly_rate: number,
  startDate: Date,
  endDate: Date,
) => {
  const msDiff = endDate.getTime() - startDate.getTime();
  const hourDiff = msDiff / 1000 / 60 / 60;
  return hourDiff * hourly_rate;
};
