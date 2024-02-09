import {create} from 'zustand';

const today = new Date();
today.setHours(0, 0, 0, 0);
today.setHours(today.getHours() + 1);
const later = new Date(today.getHours() + 4);

export type SearchState = {
  startDate: Date;
  endDate: Date;
  location?: {name: string; latitude: number; longitude: number};
  isCollapsed: boolean;
  spaceId?: string;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setLocation: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
  setCollapse: (isCollapsed: boolean) => void;
  setSpaceId: (spaceId: string) => void;
};

export const useSearchState = create<SearchState>(set => ({
  startDate: today,
  endDate: later,
  location: undefined,
  isCollapsed: true,
  setStartDate: (date: Date) => set({startDate: date}),
  setEndDate: (date: Date) => set({endDate: date}),
  setLocation: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => set({location}),
  setCollapse: (isCollapsed: boolean) => set({isCollapsed}),
  setSpaceId: (spaceId: string) => set({spaceId}),
}));
