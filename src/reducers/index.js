import {combineReducers} from 'redux';
import webDatabase from './webDatabase';
import modalState from './modal';

const rootReducer = combineReducers({
  webDatabase,
  modalState,
});

export default rootReducer;
