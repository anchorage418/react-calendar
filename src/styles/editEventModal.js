export default (theme) => ({
  modal__title: {
    textAlign: 'center',
  },
  modal__content: {
    width: '300px',
    padding: '10px',
    [theme.breakpoints.down('601')]: {
      width: '100%',
    },
  },
  modal__body: {
    padding: '0 20px 20px',
  },
  modal__btn_wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});
