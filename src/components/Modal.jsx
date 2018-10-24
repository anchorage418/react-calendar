import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

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

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
}

export default Modal;