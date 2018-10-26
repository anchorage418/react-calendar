import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired,
  };

  closeHandler = () => {
    const { closeCallback } = this.props;
    closeCallback();
  };

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

export default Modal;
