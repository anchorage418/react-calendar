import { isEmpty } from 'lodash';
import {
  CREATE_DB,
  GET_EVENTS,
} from '../actions/index'
import {
  initDB,
  getDataFromDB,
} from '../utils/utilsWebSQL'

const initalState = {
  db_created: false,
  events: [],
};

export default (state = initalState, action) => {
  switch(action.type) {
    case CREATE_DB:
      initDB();
      return {...state, db_created: true};
    case GET_EVENTS:
      const { startDate, endDate } = action.payload;
      const data =  getDataFromDB(startDate, endDate, result => result);
      console.log('reducer result', data);
      return {...state, events: data};
    default:
      return state;
  }
}
