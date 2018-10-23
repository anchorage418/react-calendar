import { 
  CREATE_DB,
  GET_EVENTS,
  SELECTED_DAY,
  SELECTED_EVENT,
} from './index';

function createDb() {
  return {
    type: CREATE_DB,
  };
}

function getEvents(startDate, endDate) {
  return {
    type: GET_EVENTS,
    payload: {
      startDate,
      endDate,
    }
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
  createDb,
  getEvents,
  selectDay,
  selectEvent,
};
