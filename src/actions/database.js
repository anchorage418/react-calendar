import { 
  GET_EVENTS,
  SELECTED_DAY,
  SELECTED_EVENT,
  ADD_EVENT,
  DELETE_EVENT,
} from './index';

function getEvents(monthPeriod) {
  return {
    type: GET_EVENTS,
    monthPeriod,
  };
}

function addEvent(event) {
  return {
    type: ADD_EVENT,
    event,
  };
}

function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    event,
  };
}

function selectDay(day) {
  return {
    type: SELECTED_DAY,
    day,
  }
}

function selectEvent(event) {
  return {
    type: SELECTED_EVENT,
    event,
  };
}

export {
  getEvents,
  selectDay,
  selectEvent,
  addEvent,
  deleteEvent,
};
