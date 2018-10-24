import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { map, isEqual, isEmpty } from 'lodash';
import totalEventsModalStyles from '../styles/totalEventsModal';

class TotalEventsDayModal extends Component {
  componentDidUpdate(prevProps) {
    const { selectedDay, toggleModal, modalState } = this.props;

    if (!isEqual(prevProps.selectedDay, selectedDay) && isEmpty(selectedDay)) {
      this.closeHandler();
    }
    if (!isEqual(prevProps.selectedDay, selectedDay) && modalState.singleEvent) {
      toggleModal({ singleEvent: false });
    }
  }

  closeHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      totalDayEvents: false,
    };
    toggleModal(settings);
  }

  eventClickHandler = (event) => {
    const { toggleModal, selectEvent, selectedEvent } = this.props;
    const settings = {
      singleEvent: true,
    };
    if (!isEqual(selectedEvent, event)) {
      selectEvent(event);
    }
    toggleModal(settings);
  }

  renderEventItem = () => {
    const { classes, selectedDay } = this.props;

    return map(selectedDay, (event, index) => (
      <div 
        className={classes.event_item} 
        key={`totalEventsModal_event_item__${index}`}
        onClick={() => this.eventClickHandler(event)}
      >
        {event.event_title}
      </div>
    ));
  }

  render() {
    const { open, classes, addEventHandler } = this.props;

    return (
      <Modal
        open={open}
        closeCallback={this.closeHandler}
      >
        <div className={classes.modal__content}>
          <h2>Events List</h2>
          <div className={classes.modal__body}>
            {this.renderEventItem()}
          </div>
          <div>
            <Button color="primary" onClick={() => addEventHandler()}>
              Add event
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

TotalEventsDayModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  selectedDay: PropTypes.array.isRequired,
  selectEvent: PropTypes.func.isRequired,
  selectedEvent: PropTypes.object.isRequired,
  addEventHandler: PropTypes.func.isRequired,
  modalState: PropTypes.object.isRequired,
}

export default withStyles(totalEventsModalStyles)(TotalEventsDayModal);