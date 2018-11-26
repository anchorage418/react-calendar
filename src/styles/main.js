export default (theme) => ({
  root: {
    width: '80%',
    maxWidth: '1500px',
    margin: '30px auto 0',
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
      padding: '12px',
    },
  },
});
