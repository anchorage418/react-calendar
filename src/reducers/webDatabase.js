import moment from 'moment';
import { isEmpty, forEach } from 'lodash';

import {
  CREATE_DB,
  GET_EVENTS,
  SELECTED_DAY,
} from '../actions/index';
import { 
  initStorage,
  getMonthEvents,
} from '../utils';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

const initalState = {
  db_created: false,
  events: [],
  selectedDay: [],
};

export default (state = initalState, action) => {
  switch(action.type) {
    case CREATE_DB:
      initStorage();
      return {...state, db_created: true};
    case GET_EVENTS:
      const { startDate, endDate } = action.payload;
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
      
      console.log('reducer result', result);
      return {...state, events: result};
    case SELECTED_DAY:
      return {...state, selectedDay: action.day}
    default:
      return state;
  }
}
