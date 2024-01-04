import {atom} from 'recoil';
import {Reservation} from './api';

export const reservationState = atom<Reservation[]>({
  key: 'reservationState',
  default: [],
});
