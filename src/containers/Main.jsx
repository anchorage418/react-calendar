import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import Calendar from '../components/Calendar';
import TotalEventsDayModal from '../components/TotalEventsDayModal';
import SingleEventModal from '../components/SingleEventModal';
import EditEventModal from '../components/EditEventModal';
import * as actions from '../actions';
import mainStyles from '../styles/main';

const FORMAT = 'DD-MM-YYYY';

class Main extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    selectedDay: PropTypes.array,
    selectedEvent: PropTypes.object,
    events: PropTypes.array,
    monthTimeSpan: PropTypes.object,
    modalState: PropTypes.object,
  };

  state = {
    dayToAddEvents: null,
  }

  addEventHandler = (day) => {
    const { toggleModal } = this.props;
    const settings = {
      addEvent: true,
    };
    
    if (day) {
      this.setState({ dayToAddEvents: day });
    } else {
      this.setState({ dayToAddEvents: null });
    }
    toggleModal(settings);
  };
  
  render() {
    const { dayToAddEvents } = this.state;
    const {
      classes,
      getEvents,
      events,
      toggleModal,
      selectDay,
      modalState,
      deleteEvent,
      selectedDay,
      selectEvent,
      selectedEvent,
      addEvent,
      monthTimeSpan,
    } = this.props;
    
    return (
      <Fragment>
        <div className={classes.main_container}>
          <Paper
            elevation={10}
            className={classes.root}
          > 
            <Calendar 
              format={FORMAT}
              events={events}
              getEvents={getEvents}
              toggleModal={toggleModal}
              selectDay={selectDay}
              selectedDay={selectedDay}
              addEventHandler={this.addEventHandler}
            />
            <div>
              <Button variant="contained" color="primary" onClick={() => this.addEventHandler()}>
                Add event
              </Button>
            </div>
          </Paper>
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
        {modalState && (modalState.addEvent || modalState.editEvent) &&
        <EditEventModal 
          toggleModal={toggleModal}
          editModal={modalState.editEvent}
          addModal={modalState.addEvent}
          addEvent={addEvent}
          getEvents={getEvents}
          deleteEvent={deleteEvent}
          monthTimeSpan={monthTimeSpan}
          selectedEvent={selectedEvent}
          dayToAddEvents={dayToAddEvents}
        />}
      </Fragment>
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

function mapDispatchToProps(dispatch) {
  return {
    getEvents: (monthPeriod) => {
      dispatch(actions.getEvents(monthPeriod));
    },
    addEvent: (event) => {
      console.log('event', event);
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
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(mainStyles)(Main));
