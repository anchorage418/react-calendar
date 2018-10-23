import {
  TOGGLE_MODAL,
} from '../actions'

const initalState = {
  totalDayEvents: false,
  singleEvent: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {...state, ...action.settings};
    default:
      return state;
  }
}
