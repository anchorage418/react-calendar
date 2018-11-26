import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Typography } from '@material-ui/core';

const FULLSCREENSIZE = 600;

class Modal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeCallback: PropTypes.func.isRequired,
  };

  state = {
    fullScreen: false,
  }

  componentDidMount() {
    if (this.dialog && window) {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
  }

  componentWillUnmount() {
    if (this.dialog && window) {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  }

  updateWindowDimensions = () => {
    this.setState({
      fullScreen: window.innerWidth < FULLSCREENSIZE,
    });
  };

  closeHandler = () => {
    const { closeCallback } = this.props;
    closeCallback();
  };
  
  render() {
    const { open } = this.props;
    const { fullScreen } = this.state;

    return (
      <Dialog
        ref={node => (this.dialog = node)}
        fullScreen={fullScreen}	
        open={open}
        onClose={this.closeHandler}
      >
        <Typography>
          {this.props.children}
        </Typography>
      </Dialog>
    );
  }
}

export default Modal;
