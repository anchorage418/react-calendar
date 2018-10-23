import moment from 'moment';
import { isEmpty, forEach } from 'lodash';

import {
  CREATE_DB,
  GET_EVENTS,
  SELECTED_DAY,
  SELECTED_EVENT,
  ADD_EVENT,
  UPDATE_EVENT,
} from '../actions/index';
import { 
  initStorage,
  getMonthEvents,
  addEvent,
  updateEvent,
} from '../utils';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

const initalState = {
  db_created: false,
  events: [],
  currentMonthTimeSpan: {},
  selectedDay: [],
  selectedEvent: {},
};

export default (state = initalState, action) => {
  switch(action.type) {
    case CREATE_DB:
      initStorage();
      return {...state, db_created: true};
    case GET_EVENTS:
      const { startDate, endDate } = action.monthPeriod;
      const monthEvents =  getMonthEvents(startDate, endDate);
      let result = [];
      forEach(monthEvents, (event) => {
        const day = moment(event.event_start, FORMAT).date();
        if (result[day]) {
          result[day].push(event);
        } else {
          result[day] = [event];
        }
      });
      return {...state, events: result, currentMonthTimeSpan: { startDate, endDate }};
    case ADD_EVENT:
      addEvent(action.event);
      return {...state};
    case UPDATE_EVENT:
      updateEvent(action.event);
    case SELECTED_DAY:
      return {...state, selectedDay: action.day}
    case SELECTED_EVENT:
      return {...state, selectedEvent: action.event}
    default:
      return state;
  }
}
