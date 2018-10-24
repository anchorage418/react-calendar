import moment from 'moment';
import { forEach } from 'lodash';

import {
  GET_EVENTS,
  SELECTED_DAY,
  SELECTED_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
} from '../actions/index';
import { 
  getMonthEvents,
  addEvent,
  deleteEvent,
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
    case DELETE_EVENT:
      deleteEvent(action.event);
      return {...state}
    case SELECTED_DAY:
      return {...state, selectedDay: action.day}
    case SELECTED_EVENT:
      return {...state, selectedEvent: action.event}
    default:
      return state;
  }
}
