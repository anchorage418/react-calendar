export default () => ({
  modal__content: {
    width: '500px',
    padding: '10px',
  },
  title: {
    textAlign: 'center',
  },
  modal__body: {
    padding: '0 20px 20px',
  },
  event_item: {
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
