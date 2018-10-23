import React, { Component } from 'react';
import Modal from './Modal';
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
        </div>
      </Modal>
    );
  }
}

export default withStyles(singleEventModalStyles)(SingleEventModal);