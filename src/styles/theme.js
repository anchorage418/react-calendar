import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    palette: {
      error: '#b71c1c',
    },
    fontFamily: [
      'Arial',
      'sans-serif',
    ].join(','),
  },
});