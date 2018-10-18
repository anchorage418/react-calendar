import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { map, forEach, range, isEmpty } from 'lodash';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

class Layout extends Component {
  get dates() {
    const date = moment();
    const currentYear = moment().year();
    const currentMonth = moment().month() + 1;
    const currentDay = moment().date();
    const currentWeekDay = moment().isoWeekday();
    const startDay = moment().startOf('month').isoWeekday();
    const daysInMonth = moment().endOf('month').date(); 

    return {
      date,
      currentYear,
      currentMonth,
      currentDay,
      currentWeekDay,
      startDay,
      daysInMonth,
    }; 
  }

  renderCalendarHeader = (year) => {
    const formatedMonth = moment().format('MMMM');

    return (
      <Fragment>
        <div>
          <h4>{`${formatedMonth} ${year}`}</h4>
        </div>
        <ul>
          {map(WEEK_DAYS, (day) => {
              return (
                <li>{day}</li>
              )
            })}
        </ul>
      </Fragment>
    );
  }
  
  renderCalendarBody = (daysInMonth, currentDay, currentMonth, currentYear) => {
    // const daysInMonthArr = range(1, daysInMonth + 1);

    let resultArr = [];
    let arr_2 = [];
    let i = 1;
    let rowDiv = <div>{arr_2}</div>;

    while(i <= daysInMonth) {
      if (moment(`${i}-${currentMonth}-${currentYear}`, 'DD-MM-YYYY').isoWeekday() !== 7) {
        arr_2.push(<div>{i}</div>)
      } else if ((moment(`${i}-${currentMonth}-${currentYear}`, 'DD-MM-YYYY').isoWeekday() === 7)) {
        arr_2.push(<div>{i}</div>);
        resultArr.push(rowDiv);
        arr_2 = [];
        rowDiv = <div>{arr_2}</div>;
      }
      if (i === daysInMonth && !isEmpty(arr_2)) {
        resultArr.push(rowDiv);
        arr_2 = [];
        rowDiv = <div>{arr_2}</div>;
      }
      i++;
    }

    return (
      resultArr
    );
  }

  renderCalendarCell = (date) => {
    const dates = this.dates;

    const cellClasses = `${classes.cell} ${dates.currentDay === date ? classes.current: ''}`;

    return (
      <div className={cellClasses}>${date}</div>
    );
  }

  render() {
    const dates = this.dates;
    console.log('dates', dates);

    return (
      <div>
        <div>
          {this.renderCalendarHeader(dates.currentYear)}
          {this.renderCalendarBody(dates.daysInMonth, dates.currentDay, dates.currentMonth, dates.currentYear)}
        </div>
      </div>
    );
  }
}

export default Layout;