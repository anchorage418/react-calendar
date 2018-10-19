import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { map, isEmpty } from 'lodash';
import { Button, Icon } from '@material-ui/core';
// import NavigateBefore from '@material-ui/icons/NavigateBefore';
// import NavigateNext from '@material-ui/icons/NavigateNext';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { withStyles } from '@material-ui/core/styles';
import calendarStyles from '../styles/calendar';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEK_TOTAL = 7;

class Calendar extends Component {
  state = {
    value: moment(),  
    step: 0,
  }

  componentDidMount() {
    console.log('CALENDAR componentDidMount');
    const { value, format } = this.props;
    if (value) {
      this.setState({
        value: moment(value, format),
      });
    }
  }

  componentDidUpdate(prevProps, prevSate) {
    // console.log('componentDidUpdate', prevSate);
    // console.log('componentDidUpdate', this.state);
    // const { value, format } = this.props;
    // if (value && prevSate.value.isSame(value)) {
    //   console.log('new POROP');
    //   this.setState({
    //     value: moment(value, format),
    //   });
    // }
  }

  get dates() {
    const { value, format } = this.state;

    const date = moment(value, format);
    const currentYear = date.year();
    const currentMonth = date.month() + 1;
    const currentDay = date.date();
    const currentWeekDay = date.isoWeekday();
    const startDay = date.startOf('month').isoWeekday();
    const endDay = date.endOf('month').isoWeekday();
    const daysInMonth = date.endOf('month').date(); 

    return {
      date,
      currentYear,
      currentMonth,
      currentDay,
      currentWeekDay,
      startDay,
      endDay,
      daysInMonth,
    }; 
  }

  prevHandler = () => {
    let { step, value } = this.state;
    
    if (step > 0) {
      this.setState({
        step: step - 1,
        value: value.subtract(1, 'M')
      });
    }
  }

  nextHandler = () => {
    let { step, value } = this.state;

    this.setState({
      step: step + 1, 
      value: value.add(1, 'M')
    });
  }

  renderCalendarHeader = () => {
    const { classes } = this.props;
    const { date, currentYear } = this.dates;
    const formatedMonth = date.format('MMMM');

    return (
      <Fragment>
        <div>
          <h4>{`${formatedMonth} ${currentYear}`}</h4>
        </div>
        <div>
          <Button onClick={this.prevHandler} variant="contained" color="primary">
            Prev
            {/* <Icon>AccessAlarmIcon</Icon> */}
          </Button>
          <Button onClick={this.nextHandler} variant="contained" color="primary">
            Next
            {/* <Icon>AccessAlarmIcon</Icon> */}
          </Button>
        </div>
        <ul className={classes.week_day__list}>
          {map(WEEK_DAYS, (day, index) => {
              return (
                <li className={classes.week_day__item} key={`week_day__item_${index}`}>
                  {day}
                </li>
              )
            })}
        </ul>
      </Fragment>
    );
  }
  
  renderCalendarBody = () => {
    const { date, daysInMonth, startDay, endDay } = this.dates;
    const { classes } = this.props;

    const pastDays = startDay !== 1 ? WEEK_TOTAL - ((WEEK_TOTAL + 1) - startDay) : null;
    const lastDays = endDay !== 7 ? WEEK_TOTAL - endDay : null;

    let resultArr = [];
    let cellsArr = [];
    let i = 1;
    let j = 1;
    let rowDiv = <div className={classes.cells_row} key={`cells_row__${i}`}>{cellsArr}</div>;

    if (pastDays) {
      while (j <= pastDays) {
        cellsArr.push(this.renderCalendarCell(j, true));
        j++;
      }
      j = 1;
    }
    while(i <= daysInMonth) {
      if (date.date(i).isoWeekday() !== WEEK_TOTAL) {
        cellsArr.push(this.renderCalendarCell(i))
      } else if (date.date(i).isoWeekday() === WEEK_TOTAL) {
        cellsArr.push(this.renderCalendarCell(i));
        resultArr.push(rowDiv);
        cellsArr = [];
        rowDiv = <div className={classes.cells_row} key={`cells_row__${i}`}>{cellsArr}</div>;
      }
      if (i === daysInMonth && !isEmpty(cellsArr)) {
        while (j <= lastDays) {
          cellsArr.push(this.renderCalendarCell(j + i, true));
          j++;
        }
        resultArr.push(rowDiv);
        // cellsArr = [];
        // rowDiv = <div className={classes.cells_row}>{cellsArr}</div>;
      }
      i++;
    }

    return (
      resultArr
    );
  }

  renderCalendarCell = (date, disabled = false) => {
    const { step } = this.state; 
    const { classes } = this.props;
    const { currentDay } = this.dates;

    const day = disabled ? '' : date;
    const itemKey = disabled ? `disabled_cell__${date}` : `cell__${date}`;

    const currenDayClass = step === 0 && !disabled && currentDay === date ? classes.current_day : '';
    const disabledDayClass = disabled ? classes.disabled_day : '';
    const pastDayClass = step === 0 && !disabled && date < currentDay ? classes.past_day : '';

    const cellClasses = `${classes.cell} ${currenDayClass} ${disabledDayClass} ${pastDayClass}`;

    return (
      <div className={cellClasses} key={itemKey}>{day}</div>
    );
  }

  render() {
    const { classes } = this.props;
    const dates = this.dates;
    console.log('dates', dates);
    console.log('this.state', this.state);
    console.log('this.props', this.props);

    return (
      <div>
        <div>
          <div className={classes.calendar_header}>
            {this.renderCalendarHeader()}
          </div>
          <div className={classes.calendar_body}>
            {this.renderCalendarBody()}
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string.isRequired,   
}

export default withStyles(calendarStyles)(Calendar);
