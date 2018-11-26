export default (theme) => ({
  modal__content: {
    width: '500px',
    padding: '10px',
    [theme.breakpoints.down('601')]: {
      width: '100%',
    },
  },
  title: {
    textAlign: 'center',
  },
  modal__body: {
    padding: '0 20px 20px',
  },
  modal__btn_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  event_item: {
    marginBottom: '14px',
    padding: '10px',
    border: '1px solid #303f9f',
    borderRadius: '4px',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: 'rgba(48, 63, 159, 0.2)',
      color: '#303f9f',
      cursor: 'pointer',
    }
  },
});
