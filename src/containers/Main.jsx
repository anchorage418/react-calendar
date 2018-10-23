import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Calendar from '../components/Calendar';
import TotalEventsDayModal from '../components/TotalEventsDayModal';
import SingleEventModal from '../components/SingleEventModal';
import EditEventModal from '../components/EditEventModal';
import * as actions from '../actions';

const FORMAT = 'DD-MM-YYYY';

class Main extends Component {
  componentDidMount() {
    console.log('MAIN componentDidMount');
    const { createDb, getEvents } = this.props;
    createDb();
    // getEvents();
  }

  addEventHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      addEvent: true,
    };
    toggleModal(settings);
  }
  
  render() {
    const { getEvents, dbIsConnected, events, 
            toggleModal, selectDay, modalState, 
            selectedDay, selectEvent, selectedEvent, 
            addEvent, monthTimeSpan, updateEvent,
          } = this.props;
    
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
          <div>
            <Button color="primary" onClick={this.addEventHandler}>
              Add event
            </Button>
          </div>
        </div>
        {modalState && modalState.totalDayEvents && 
        <TotalEventsDayModal
          open={modalState.totalDayEvents}
          toggleModal={toggleModal}
          selectedDay={selectedDay}
          selectEvent={selectEvent}
          selectedEvent={selectedEvent}
          addEventHandler={this.addEventHandler}
        />}
        {modalState && modalState.singleEvent && 
        <SingleEventModal
          open={modalState.singleEvent}
          toggleModal={toggleModal}
          // selectedDay={selectedDay}
          // selectEvent={selectEvent}
          selectedEvent={selectedEvent}
        />}
        {
        <EditEventModal 
          toggleModal={toggleModal}
          editModal={modalState.editEvent}
          addModal={modalState.addEvent}
          addEvent={addEvent}
          updateEvent={updateEvent}
          getEvents={getEvents}
          monthTimeSpan={monthTimeSpan}
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
    monthTimeSpan: webDatabase.currentMonthTimeSpan,  
    modalState,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    createDb: () => {
      dispatch(actions.createDb());
    },
    getEvents: (monthPeriod) => {
      dispatch(actions.getEvents(monthPeriod));
    },
    addEvent: (event) => {
      dispatch(actions.addEvent(event));
    },
    updateEvent: (event) => {
      dispatch(actions.updateEvent(event));
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
