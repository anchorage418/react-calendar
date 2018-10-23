import React, { Component } from 'react';
// import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
// import * as actions from '../actions';

class Modal extends Component {
  closeHandler = () => {
    const { closeCallback } = this.props;
    closeCallback();
  }

  render() {
    const { open } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.closeHandler}
      >
        {this.props.children}
      </Dialog>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { modalState } = state;
//   return {
//     open: modalState.open,
//   };
// };

// function mapDispatchToProps(dispatch) {
//   return {
//     createDb: () => {
//       dispatch(actions.createDb());
//     },
//     getEvents: (startDate, endDate) => {
//       dispatch(actions.getEvents(startDate, endDate));
//     },
//     selectDay: (day) => {
//       if (day) {
//         dispatch(actions.selectDay(day));
//       }
//     },
//     toggleModal: (settings, open) => {
//       dispatch(actions.toggleModal(settings, open));
//     },
//   }
// };


export default Modal;