import React, { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from '../components/Calendar';
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
    const { getEvents, dbIsConnected, events, toggleModal, selectDay } = this.props;
    
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
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { webDatabase } = state;
  return {
    dbIsConnected: webDatabase.db_created,
    events: webDatabase.events,  
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
    toggleModal: (settings) => {
      dispatch(actions.toggleModal(settings));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
