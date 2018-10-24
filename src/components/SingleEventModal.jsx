import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import singleEventModalStyles from '../styles/singleEventModal';

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

SingleEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  selectEvent: PropTypes.func,
  deleteEvent: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
  monthTimeSpan: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired,
}

export default withStyles(singleEventModalStyles)(SingleEventModal);