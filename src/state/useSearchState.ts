import {create} from 'zustand';

const today = new Date();
today.setHours(0, 0, 0, 0);
today.setHours(today.getHours() + 1);
const later = new Date(today.getHours() + 4);

export type SearchState = {
  startDate: Date;
  endDate: Date;
  location?: {latitude: number; longitude: number};
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setLocation: (location: {latitude: number; longitude: number}) => void;
};

export const useSearchState = create<SearchState>(set => ({
  startDate: today,
  endDate: later,
  location: undefined,
  setStartDate: (date: Date) => set({startDate: date}),
  setEndDate: (date: Date) => set({endDate: date}),
  setLocation: (location: {latitude: number; longitude: number}) =>
    set({location}),
}));
