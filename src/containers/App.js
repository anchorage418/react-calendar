import React, { Component, Fragment } from 'react';
import { CssBaseline, Typography } from '@material-ui/core';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Typography>
          <Main />
        </Typography>
      </Fragment>
    );
  }
}

export default App;
