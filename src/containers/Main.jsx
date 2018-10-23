import React, { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from '../components/Calendar';
import TotalEventsDayModal from '../components/TotalEventsDayModal';
import SingleEventModal from '../components/SingleEventModal';
import * as actions from '../actions';

const FORMAT = 'DD-MM-YYYY';

class Main extends Component {
  componentDidMount() {
    console.log('MAIN componentDidMount');
    const { createDb, getEvents } = this.props;
    createDb();
    // getEvents();
  }

  // modalChangeHandler = (se) => {
  //   const { toggleModal } = this.porps;
  // }
  
  render() {
    const { getEvents, dbIsConnected, events, toggleModal, selectDay, modalState, selectedDay, selectEvent, selectedEvent } = this.props;
    
    return (
      <div>
        <div>
          <Calendar 
            // value={''}
            format={FORMAT}
            events={events}
            getEvents={getEvents}
            toggleModal={toggleModal}
            selectDay={selectDay}
            dbIsConnected={dbIsConnected}
            selectedDay={selectedDay}
          />
        </div>
        {modalState && modalState.totalDayEvents && 
        <TotalEventsDayModal
          open={modalState.totalDayEvents}
          toggleModal={toggleModal}
          selectedDay={selectedDay}
          selectEvent={selectEvent}
          selectedEvent={selectedEvent}
        />}
        {modalState && modalState.singleEvent && 
        <SingleEventModal
          open={modalState.singleEvent}
          toggleModal={toggleModal}
          selectedDay={selectedDay}
          selectEvent={selectEvent}
          selectedEvent={selectedEvent}
        />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { webDatabase, modalState } = state;
  return {
    dbIsConnected: webDatabase.db_created,
    selectedDay: webDatabase.selectedDay,
    selectedEvent: webDatabase.selectedEvent,
    events: webDatabase.events,  
    modalState,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    createDb: () => {
      dispatch(actions.createDb());
    },
    getEvents: (startDate, endDate) => {
      dispatch(actions.getEvents(startDate, endDate));
    },
    selectDay: (day) => {
      if (day) {
        dispatch(actions.selectDay(day));
      }
    },
    selectEvent: (event) => {
      if (event) {
        dispatch(actions.selectEvent(event));
      }
    },
    toggleModal: (settings) => {
      dispatch(actions.toggleModal(settings));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
