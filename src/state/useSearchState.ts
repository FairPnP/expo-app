import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import {create} from 'zustand';

const today = new Date();
today.setHours(today.getHours() + 1, 0, 0, 0);
const later = new Date(today);
later.setHours(today.getHours() + 4);

export type SearchState = {
  startDate: Date;
  endDate: Date;
  location?: {
    latitude: number;
    longitude: number;
    data: GooglePlaceData;
    detail: GooglePlaceDetail;
  };
  isCollapsed: boolean;
  spaceId?: string;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setLocation: (location: {
    latitude: number;
    longitude: number;
    data: GooglePlaceData;
    detail: GooglePlaceDetail;
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
    latitude: number;
    longitude: number;
    data: GooglePlaceData;
    detail: GooglePlaceDetail;
  }) => set({location}),
  setCollapse: (isCollapsed: boolean) => set({isCollapsed}),
  setSpaceId: (spaceId: string) => set({spaceId}),
}));
