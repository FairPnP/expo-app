import {useState} from 'react';

const today = new Date();
today.setHours(0, 0, 0, 0);
today.setHours(today.getHours() + 1);
const later = new Date(today.getHours() + 4);

export const useSearchBar = () => {
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(later);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  return {
    startDate,
    endDate,
    location,
    setStartDate,
    setEndDate,
    setLocation,
  };
};
