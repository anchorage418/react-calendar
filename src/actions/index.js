import {
  createDb,
  getEvents,
  selectDay,
  selectEvent,
} from './database';
import {
  toggleModal,
} from './ui';

export const CREATE_DB = 'CREATE_DB';
export const GET_EVENTS = 'GET_EVENTS';
export const SELECTED_DAY = 'SELECTED_DAY';
export const SELECTED_EVENT = 'SELECTED_EVENT';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export {
  createDb,
  getEvents,
  toggleModal,
  selectDay,
  selectEvent,
}
