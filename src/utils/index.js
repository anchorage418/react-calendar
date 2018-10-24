import moment from 'moment';
import { forEach, sortBy, isEqual } from 'lodash';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

const setToStorage = (key, value) => {
  if (window && window.localStorage) {
    const localStorage = window.localStorage;
    localStorage.setItem(key, JSON.stringify(value));
  } 
};

const getFromStorage = (key) => {
  if (window && window.localStorage) {
    const localStorage = window.localStorage;
    return (JSON.parse(localStorage.getItem(key)) || []);
  }
};

const getMonthEvents = (startDate, endDate) => {
  const startDateMoment = moment(startDate, FORMAT);
  const endDateMoment = moment(endDate, FORMAT);
  const events = getFromStorage('calendar_events');
  let sortedEvents = [];
  forEach(events, (event) => {
    const eventStartMoment = moment(event.event_start, FORMAT);
    const eventEndMoment = moment(event.event_end, FORMAT);
    if (eventStartMoment.isSameOrAfter(startDateMoment) && eventEndMoment.isSameOrBefore(endDateMoment)) {
      sortedEvents.push(event);
    }
  });
  sortedEvents = sortBy(sortedEvents, [(obj) => obj.event_start])
  return sortedEvents;
};

const addEvent = (event) => {
  const storage = getFromStorage('calendar_events');
  storage.push(event);
  setToStorage('calendar_events', storage);
}

const deleteEvent = (eventToDelete) => {
  const events = getFromStorage('calendar_events');
  let newArr = [];
  forEach(events, (event) => {
    if (!isEqual(event, eventToDelete)) {
      newArr.push(event);
    }
  });
  setToStorage('calendar_events', newArr);
}

export {
  setToStorage,
  getFromStorage,
  getMonthEvents,
  addEvent,
  deleteEvent,
};
