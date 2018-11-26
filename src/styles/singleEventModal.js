export default (theme) => ({
  modal__content: {
    width: '400px',
    padding: '10px',
    [theme.breakpoints.down('601')]: {
      width: '100%',
    },
  },
  modal__title: {
    textAlign: 'center',
  },
  dates_range: {
    padding: '10px 0 20px',
    textAlign: 'center'
  },
  event_description: {
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: '#e6e6e6',
  },
  modal__btn_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});
