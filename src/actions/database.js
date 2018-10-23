import { 
  CREATE_DB,
  GET_EVENTS,
  SELECTED_DAY,
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

export {
  createDb,
  getEvents,
  selectDay,
};
