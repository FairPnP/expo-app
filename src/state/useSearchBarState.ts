import {useState} from 'react';

const today = new Date();
today.setHours(0, 0, 0, 0);
today.setHours(today.getHours() + 1);
const later = new Date(today.getHours() + 4);

export const useSearchBarState = () => {
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(later);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(undefined);

  return {
    startDate,
    endDate,
    location,
    setStartDate,
    setEndDate,
    setLocation,
  };
};
