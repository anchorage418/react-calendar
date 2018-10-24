import {
  createDb,
  getEvents,
  selectDay,
  selectEvent,
  addEvent,
  // updateEvent,
  deleteEvent,
} from './database';
import {
  toggleModal,
} from './ui';

export const CREATE_DB = 'CREATE_DB';
export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';
// export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SELECTED_DAY = 'SELECTED_DAY';
export const SELECTED_EVENT = 'SELECTED_EVENT';

export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export {
  createDb,
  getEvents,
  toggleModal,
  selectDay,
  selectEvent,
  addEvent,
  // updateEvent,
  deleteEvent,
}
