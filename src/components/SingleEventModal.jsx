import React, { Component } from 'react';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { map, isEqual } from 'lodash';
import singleEventModalStyles from '../styles/totalEventsModal';

class SingleEventModal extends Component {
  closeHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      singleEvent: false,
    };
    toggleModal(settings);
  }

  editEventHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      editEvent: true,
    };
    toggleModal(settings);
  }

  deleteEventHandler = () => {
    const { selectedEvent, deleteEvent, monthTimeSpan, getEvents } = this.props;
    console.log('selected', selectedEvent);
    deleteEvent(selectedEvent);
    getEvents(monthTimeSpan);
    this.closeHandler();
  }

  render() {
    const { open, classes, selectedEvent: { event_title, event_desc } } = this.props;

    return (
      <Modal
        open={open}
        closeCallback={this.closeHandler}
      >
        <div className={classes.modal__content}>
          <h2>{event_title}</h2>
          <div className={classes.modal__body}>
            {event_desc}
          </div>
          <Button onClick={this.editEventHandler}>
            Edit
          </Button>
          <Button onClick={this.deleteEventHandler}>
            Delete
          </Button>
        </div>
      </Modal>
    );
  }
}

export default withStyles(singleEventModalStyles)(SingleEventModal);