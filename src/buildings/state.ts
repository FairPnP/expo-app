import {atom} from 'recoil';
import {Building} from './api';

export const buildingsState = atom<Building[]>({
  key: 'buildingsState',
  default: [],
});
