import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { map, forEach, range, isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import calendarStyles from '../styles/calendar';

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEK_TOTAL = 7;

class Calendar extends Component {
  state = {
    value: moment(),  
  }

  componentDidMount() {
    console.log('componentDidMount');
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

  renderCalendarHeader = () => {
    const { classes } = this.props;
    const { date, currentYear } = this.dates;
    const formatedMonth = date.format('MMMM');

    return (
      <Fragment>
        <div>
          <h4>{`${formatedMonth} ${currentYear}`}</h4>
        </div>
        <ul className={classes.week_day__list}>
          {map(WEEK_DAYS, (day) => {
              return (
                <li className={classes.week_day__item}>
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

    const pastDays = startDay !== 1 ? WEEK_TOTAL - startDay : null;
    const lastDays = endDay !== 7 ? WEEK_TOTAL - endDay : null;

    let resultArr = [];
    let cellsArr = [];
    let i = 1;
    let j = 1;
    let rowDiv = <div className={classes.cells_row}>{cellsArr}</div>;

    if (pastDays) {
      while (j <= pastDays) {
        cellsArr.push(this.renderCalendarCell('', true));
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
        rowDiv = <div className={classes.cells_row}>{cellsArr}</div>;
      }
      if (i === daysInMonth && !isEmpty(cellsArr)) {
        while (j <= lastDays) {
          cellsArr.push(this.renderCalendarCell('', true));
          j++;
        }
        resultArr.push(rowDiv);
        cellsArr = [];
        rowDiv = <div className={classes.cells_row}>{cellsArr}</div>;
      }
      i++;
    }

    return (
      resultArr
    );
  }

  renderCalendarCell = (date, disabled = false) => {
    const { classes } = this.props;
    const { currentDay } = this.dates;

    const currenDayClass = currentDay === date ? classes.current_day : '';
    const disabledDayClass = disabled ? classes.disabled_day : '';
    const pastDayClass = date && date < currentDay ? classes.past_day : '';

    const cellClasses = `${classes.cell} ${currenDayClass} ${disabledDayClass} ${pastDayClass}`;

    return (
      <div className={cellClasses}>{date}</div>
    );
  }

  render() {
    const dates = this.dates;
    console.log('dates', dates);
    console.log('this.state', this.state);
    console.log('this.props', this.props);

    return (
      <div>
        <div>
          {this.renderCalendarHeader()}
          {this.renderCalendarBody()}
        </div>
      </div>
    );
  }
}

export default withStyles(calendarStyles)(Calendar);
