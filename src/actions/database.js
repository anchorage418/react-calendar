import { 
  CREATE_DB,
  GET_EVENTS,
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

export {
  createDb,
  getEvents,
};
