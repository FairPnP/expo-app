import {atom} from 'recoil';

export type SearchBarState = {
  startDate: Date;
  endDate: Date;
  location: {
    latitude: number;
    longitude: number;
  };
};

const today = new Date();
today.setHours(0, 0, 0, 0);
today.setHours(today.getHours() + 1);
const later = new Date(today.getHours() + 4);

export const searchBarState = atom<SearchBarState>({
  key: 'searchBarState',
  default: {
    startDate: today,
    endDate: later,
    location: null,
  },
});
