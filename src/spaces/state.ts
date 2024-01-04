import {atom} from 'recoil';
import {Space} from './api';

export const mySpotsState = atom<Space[]>({
  key: 'mySpotsState',
  default: [],
});

export const myFavoritesState = atom<Space[]>({
  key: 'myFavoritesState',
  default: [],
});
