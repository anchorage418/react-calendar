import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { Edit, Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import singleEventModalStyles from '../styles/singleEventModal';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

class SingleEventModal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    selectEvent: PropTypes.func,
    deleteEvent: PropTypes.func.isRequired,
    selectedEvent: PropTypes.object.isRequired,
    monthTimeSpan: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired,
  };

  closeHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      singleEvent: false,
    };
    toggleModal(settings);
  };

  editEventHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      editEvent: true,
    };
    toggleModal(settings);
  };

  deleteEventHandler = () => {
    const { selectedEvent, deleteEvent, monthTimeSpan, getEvents } = this.props;
    deleteEvent(selectedEvent);
    getEvents(monthTimeSpan);
    this.closeHandler();
  };

  render() {
    const {
      open, 
      classes, 
      selectedEvent: { event_title, event_desc, event_start, event_end } 
    } = this.props;
    const formatedStartDate = moment(event_start).format(FORMAT);
    const formatedEndDate = moment(event_end).format(FORMAT);

    return (
      <Modal
        open={open}
        closeCallback={this.closeHandler}
      >
        <div className={classes.modal__content}>
          <h2 className={classes.modal__title}>
            {event_title}
          </h2>
          <div className={classes.modal__body}>
            <div className={classes.dates_range}>
              {formatedStartDate} - {formatedEndDate}
            </div>
            <div className={classes.event_description}>
              {event_desc}
            </div>
          </div>
          <div className={classes.modal__btn_wrapper}>
            <Button 
              variant="contained"
              color="primary"
              onClick={this.editEventHandler}
            >
              Edit
              <Edit />
            </Button>
            <Button onClick={this.closeHandler}>
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={this.deleteEventHandler}
            >
              Delete
              <Delete />
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(singleEventModalStyles)(SingleEventModal);
