import {Availability} from './dtos';

export * from './dtos';
export * from './service';

export const getAvailabilityCost = (
  availability: Availability,
  startDate: Date,
  endDate: Date,
) => {
  const msDiff = endDate.getTime() - startDate.getTime();
  const hourDiff = msDiff / 1000 / 60 / 60;
  return hourDiff * availability.hourly_rate;
};
