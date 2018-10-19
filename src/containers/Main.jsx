import React, { Component } from 'react';
import {connect} from 'react-redux';
import Calendar from '../components/Calendar';
import * as actions from '../actions'

const FORMAT = 'DD-MM-YYYY'

class Main extends Component {
  componentDidMount() {
    console.log('MAIN componentDidMount');
    const { connectDB } = this.props;
    const db = connectDB();
    console.log('db', db);
  }
  
  render() {
    return (
      <div>
        <div>
          <Calendar 
            value={''}
            format={FORMAT}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    connectDB: () => {
      dispatch(actions.connectDb());
    },
  }
};

export default connect(null, mapDispatchToProps)(Main);