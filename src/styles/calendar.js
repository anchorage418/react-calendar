export default () => ({
  calendar_header: {

  },
  calendar_body: {
    // width: '500px',
  },
  cell: {
    position: 'relative',
    width: '100px',
    height: '100px',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  current_day: {
    fontWeight: 'bold',
  },
  cells_row: {
    display: 'flex',
  },
  disabled_day: {
    backgroundColor: 'grey',
  },
  past_day: {
    color: 'blue',
  },
  week_day__list: {
    display: 'flex',
    padding: 0,
    listStyleType: 'none',
  },
  week_day__item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '30px',
  },
  events_tooltip: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#303f9f',
    color: '#fff',
  },
});
