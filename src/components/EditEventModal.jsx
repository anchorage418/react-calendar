import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { 
  KeyboardArrowLeft, 
  KeyboardArrowRight,
  DateRange,
  AccessTime, 
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { trim } from 'lodash';
import editEventModalStyles from '../styles/editEventModal';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

class EditEventModal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    editModal: PropTypes.bool.isRequired,
    addModal: PropTypes.bool.isRequired,
    addEvent: PropTypes.func.isRequired,
    getEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    monthTimeSpan: PropTypes.object.isRequired,
    selectedEvent: PropTypes.object.isRequired,
  };

  state = {
    eventTitle: '',
    eventDesc: '',
    eventStart: '',
    eventEnd: '',
  };

  componentDidUpdate(prevProps) {
    const { 
      editModal,
      addModal,
      dayToAddEvents,
      selectedEvent: { 
        event_title, 
        event_desc, 
        event_start, 
        event_end,
      },
    } = this.props;
    
    if (prevProps.editModal !== editModal && editModal) {
      this.setState({
        eventTitle: event_title,
        eventDesc: event_desc,
        eventStart: event_start,
        eventEnd: event_end,
      });
    } else if (prevProps.addModal !== addModal && addModal) {
      if (prevProps.dayToAddEvents !== dayToAddEvents && !dayToAddEvents) {
        this.setState({
          eventTitle: '',
          eventDesc: '',
          eventStart: '',
          eventEnd: '',
        });
      } else {
        console.log('3');
        const dayToAddEventsStart = moment(dayToAddEvents).startOf('day');
        const dayToAddEventsEnd = moment(dayToAddEvents).endOf('day');
        this.setState({
          eventTitle: '',
          eventDesc: '',
          eventStart: dayToAddEventsStart,
          eventEnd: dayToAddEventsEnd,
        });
      }
    }
  }

  closeAddModalHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      addEvent: false,
    };
    toggleModal(settings);
  };

  closeEditModalHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      editEvent: false,
    };
    toggleModal(settings);
  };

  changeHandler = (e) => {
    const elId = e.target.id;
    const elValue = e.target.value;

    if (elId === 'event_title') {
      this.setState({ eventTitle: elValue });
    } else if (elId === 'event_desc') {
      this.setState({ eventDesc: elValue });
    } 
  };

  startDatePickerHandler = (date) => {
    this.setState({ eventStart: date });
  }

  endDatePickerHandler = (date) => {
    this.setState({ eventEnd: date });
  }

  validate = () => {
    // TODO: adjust validation
    const {
      editModal,
      addEvent,
      monthTimeSpan,
      deleteEvent,
      addModal,
      getEvents,
      selectedEvent,
      selectedEvent: {
        event_title,
        event_desc
      }
    } = this.props;
    const { eventTitle, eventDesc, eventStart, eventEnd } = this.state;

    const eventStartMoment = moment(eventStart, FORMAT, true);
    const eventEndMoment = moment(eventEnd, FORMAT, true);
    const validEventTitle = addEvent ? trim(eventTitle).length > 0 : trim(eventTitle).length > 0 && event_title !== eventTitle;
    const validEventDesc = addEvent ? trim(eventDesc).length > 0 : trim(eventDesc).length > 0 && event_desc !== eventDesc;

    if (eventStartMoment.isValid() 
    && eventEndMoment.isValid() 
    && validEventTitle 
    && validEventDesc
    && eventEndMoment.isSameOrAfter(eventStartMoment)) {
      const newEvent = {
        event_title: eventTitle,
        event_desc: eventDesc,
        event_start: eventStart,
        event_end: eventEnd,
      };
      if (addModal) {
        addEvent(newEvent);
        getEvents(monthTimeSpan);
        this.closeAddModalHandler();
      } else if (editModal) {
        deleteEvent(selectedEvent);
        addEvent(newEvent);
        getEvents(monthTimeSpan);
        this.closeEditModalHandler();
      }
    }
  };

  renderForm = () => {
    const {
      eventTitle,
      eventDesc,
      eventStart, 
      eventEnd, 
    } = this.state;

    return (
      <div>
        <div>
          <TextField 
            label="Event title"
            onChange={this.changeHandler}
            id="event_title"
            value={eventTitle}
            fullWidth
          />
        </div>
        <div>
          <DateTimePicker
            label="Event start"
            invalidLabel="YYYY-MM-DD HH:mm:ss"
            value={eventStart}
            onChange={this.startDatePickerHandler}
            format={FORMAT}
            clearable
            fullWidth
            dateRangeIcon={
              <DateRange />
            }
            timeIcon={
              <AccessTime />
            }
            leftArrowIcon={
              <KeyboardArrowLeft />
            }
            rightArrowIcon={
              <KeyboardArrowRight />
            }
          />
        </div>
        <div>
          <DateTimePicker
            label="Event end"
            invalidLabel="YYYY-MM-DD HH:mm:ss"
            value={eventEnd}
            onChange={this.endDatePickerHandler}
            format={FORMAT}
            clearable
            fullWidth
            dateRangeIcon={
              <DateRange />
            }
            timeIcon={
              <AccessTime />
            }
            leftArrowIcon={
              <KeyboardArrowLeft />
            }
            rightArrowIcon={
              <KeyboardArrowRight />
            }
          />
        </div>
        <div>
          <TextField 
            multiline={true}
            rows={5}
            label="Event description"
            onChange={this.changeHandler}
            id="event_desc"
            value={eventDesc}
            fullWidth
          />
        </div>
      </div>
    );
  };

  renderAddModal = () => {
    const { classes, addModal } = this.props;

    return (
      <Modal
          open={addModal}
          closeCallback={this.closeAddModalHandler}
        >
        <div className={classes.modal__content}>
          <h2 className={classes.modal__title}>
            Add New Event
          </h2>
          <div className={classes.modal__body}>
            {this.renderForm()}
          </div>
          <div className={classes.modal__btn_wrapper}>
            <Button 
              color="primary"
              variant="contained"
              onClick={this.validate}
            >
              Add event
            </Button>
            <Button onClick={this.closeAddModalHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  renderEditModal = () => {
    const { classes, editModal } = this.props;

    return (
      <Modal
        open={editModal}
        closeCallback={this.closeEditModalHandler}
      >
        <div className={classes.modal__content}>
          <h2 className={classes.modal__title}>
            Edit Event
          </h2>
          <div className={classes.modal__body}>
            {this.renderForm()}
          </div>
          <div className={classes.modal__btn_wrapper}>
            <Button 
              color="primary"
              variant="contained"
              onClick={this.validate}
            >
              Edit event
            </Button>
            <Button onClick={this.closeEditModalHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  renderContent = () => {
    const { editModal, addModal } = this.props;
    if (editModal) {
      return this.renderEditModal();
    } else if (addModal) {
      return this.renderAddModal();
    }
  };

  render() {
    console.log('this.state', this.state);
    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    );
  }
}

export default withStyles(editEventModalStyles)(EditEventModal);
