import React, { Component } from 'react';
import Calendar from '../components/Calendar';

const FORMAT = 'DD-MM-YYYY'

class Main extends Component {
  
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

export default Main;