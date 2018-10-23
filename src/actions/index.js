import {
  createDb,
  getEvents,
  selectDay,
} from './database';
import {
  toggleModal,
} from './ui';

export const CREATE_DB = 'CREATE_DB';
export const GET_EVENTS = 'GET_EVENTS';
export const SELECTED_DAY = 'SELECTED_DAY';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export {
  createDb,
  getEvents,
  toggleModal,
  selectDay,
}
