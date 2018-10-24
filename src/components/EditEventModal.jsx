import React, { Component, Fragment } from 'react';
import Modal from './Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { map, isEqual, trim } from 'lodash';
import editEventModalStyles from '../styles/totalEventsModal';

const FORMAT = 'YYYY-MM-DD HH:mm:ss';

class EditEventModal extends Component {
  state = {
    eventTitle: '',
    eventDesc: '',
    eventStart: '',
    eventEnd: '',
  }

  componentDidUpdate(prevProps) {
    const { 
      editModal,
      selectedEvent: { 
        event_title, 
        event_desc, 
        event_start, 
        event_end
      },
    } = this.props;
    
    if (prevProps.editModal !== editModal && editModal) {
      this.setState({
        eventTitle: event_title,
        eventDesc: event_desc,
        eventStart: event_start,
        eventEnd: event_end,
      });
    } else if (prevProps.editModal !== editModal && !editModal) {
      this.setState({
        eventTitle: '',
        eventDesc: '',
        eventStart: '',
        eventEnd: '',
      });
    }
  }

  closeAddModalHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      addEvent: false,
    };
    toggleModal(settings);
  }

  closeEditModalHandler = () => {
    const { toggleModal } = this.props;
    const settings = {
      editEvent: false,
    };
    toggleModal(settings);
  }

  changeHandler = (e) => {
    const elId = e.target.id;
    const elValue = e.target.value;

    if (elId === 'event_title') {
      this.setState({ eventTitle: elValue });
    } else if (elId === 'event_desc') {
      this.setState({ eventDesc: elValue });
    } else if (elId === 'event_start') {
      this.setState({ eventStart: elValue });
    } else if (elId === 'event_end') {
      this.setState({ eventEnd: elValue });
    }
  }

  validate = () => {
    const { editModal, addEvent, updateEvent, 
            deleteEvent, addModal, monthTimeSpan, 
            getEvents, selectedEvent, 
            selectedEvent: { event_title, event_desc } 
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
        console.log('valid addMOdal');
        addEvent(newEvent);
        getEvents(monthTimeSpan);
        this.closeAddModalHandler();
      } else if (editModal) {
        console.log('valid editMOdal');
        // updateEvent(newEvent, selectedEvent);
        deleteEvent(selectedEvent);
        addEvent(newEvent);
        getEvents(monthTimeSpan);
        this.closeEditModalHandler();
        // getEvents(monthTimeSpan);
      }
    }
  }

  renderForm = () => {
    const { classes, addModal, editModal } = this.props;
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
            onChange={(e) => this.changeHandler(e)}
            id="event_title"
            value={eventTitle}
          />
        </div>
        <div>
          <TextField 
            label="Event start"
            onChange={(e) => this.changeHandler(e)}
            id="event_start"
            placeholder="YYYY-MM-DD HH:mm:ss"
            value={eventStart}
          />
        </div>
        <div>
          <TextField 
            label="Event end"
            onChange={(e) => this.changeHandler(e)}
            id="event_end"
            placeholder="YYYY-MM-DD HH:mm:ss"
            value={eventEnd}
          />
        </div>
        <div>
          <TextField 
            multiline={true}
            rows={5}
            label="Event description"
            onChange={(e) => this.changeHandler(e)}
            id="event_desc"
            value={eventDesc}
          />
        </div>
      </div>
    );
  }

  renderAddModal = () => {
    const { classes, addModal } = this.props;

    return (
      <Modal
          open={addModal}
          closeCallback={this.closeAddModalHandler}
        >
        <div className={classes.modal__content}>
          <h2>Add New Event</h2>
          <div className={classes.modal__body}>
            {this.renderForm()}
          </div>
          <div>
            <Button onClick={this.validate}>
              Add event
            </Button>
            <Button onClick={this.closeAddModalHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  renderEditModal = () => {
    const { classes, editModal } = this.props;

    return (
      <Modal
          open={editModal}
          closeCallback={this.closeEditModalHandler}
        >
        <div className={classes.modal__content}>
          <h2>Edit Event</h2>
          <div className={classes.modal__body}>
            {this.renderForm()}
          </div>
          <div>
            <Button onClick={this.validate}>
              Edit event
            </Button>
            <Button onClick={this.closeEditModalHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  renderContent = () => {
    const { editModal, addModal } = this.props;
    if (editModal) {
      return this.renderEditModal();
    } else if (addModal) {
      return this.renderAddModal();
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderContent()}
      </Fragment>
    );
  }
}

export default withStyles(editEventModalStyles)(EditEventModal);