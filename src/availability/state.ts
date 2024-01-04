import {atom} from 'recoil';
import {Availability} from './api';

export const availabilityState = atom<Availability[]>({
  key: 'availabilityState',
  default: [],
});
