import React, { Component } from 'react';
import {connect} from 'react-redux';
import { isEmpty } from 'lodash';
import Calendar from '../components/Calendar';
import * as actions from '../actions'

const FORMAT = 'DD-MM-YYYY'

class Main extends Component {
  componentDidMount() {
    console.log('MAIN componentDidMount');
    const { createDb, getEvents } = this.props;
    createDb();
    // getEvents();
  }
  
  render() {
    const { getEvents, dbIsConnected, events } = this.props;
    
    return (
      <div>
        <div>
          <Calendar 
            // value={''}
            format={FORMAT}
            events={events}
            getEvents={getEvents}
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
