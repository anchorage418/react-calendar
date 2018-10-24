import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Calendar from '../components/Calendar';
import TotalEventsDayModal from '../components/TotalEventsDayModal';
import SingleEventModal from '../components/SingleEventModal';
import EditEventModal from '../components/EditEventModal';
import * as actions from '../actions';

const FORMAT = 'DD-MM-YYYY';

class Main extends Component {
  addEventHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      addEvent: true,
    };
    toggleModal(settings);
  }
  
  render() {
    const { getEvents, events, toggleModal, 
            selectDay, modalState, deleteEvent,
            selectedDay, selectEvent, selectedEvent, 
            addEvent, monthTimeSpan,
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
          modalState={modalState}
        />}
        {modalState && modalState.singleEvent && 
        <SingleEventModal
          open={modalState.singleEvent}
          toggleModal={toggleModal}
          selectedEvent={selectedEvent}
          deleteEvent={deleteEvent}
          monthTimeSpan={monthTimeSpan}
          getEvents={getEvents}
        />}
        {
        <EditEventModal 
          toggleModal={toggleModal}
          editModal={modalState.editEvent}
          addModal={modalState.addEvent}
          addEvent={addEvent}
          getEvents={getEvents}
          deleteEvent={deleteEvent}
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
    selectedDay: webDatabase.selectedDay,
    selectedEvent: webDatabase.selectedEvent,
    events: webDatabase.events,
    monthTimeSpan: webDatabase.currentMonthTimeSpan,  
    modalState,
  };
};

Main.propTypes = {
  selectedDay: PropTypes.array,
  selectedEvent: PropTypes.object,
  events: PropTypes.array,
  monthTimeSpan: PropTypes.object,
  modalState: PropTypes.object,
}

function mapDispatchToProps(dispatch) {
  return {
    getEvents: (monthPeriod) => {
      dispatch(actions.getEvents(monthPeriod));
    },
    addEvent: (event) => {
      dispatch(actions.addEvent(event));
    },
    deleteEvent: (event) => {
      dispatch(actions.deleteEvent(event));
    },
    selectDay: (day) => {
      dispatch(actions.selectDay(day));
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
