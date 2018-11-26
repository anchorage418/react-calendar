export default (theme) => ({
  calendar__root: {

  },
  calendar_header: {

  },
  calendar_body: {
    marginBottom: '18px',
  },
  calendar_header__title: {
    margin: '10px 0',
    textAlign: 'center',
  },
  cell: {
    position: 'relative',
    width: '100%',
    height: '100px',
    padding: '6px',
    display: 'flex',
    borderRight: '1px solid rgba(128, 128, 128, 0.21)',
    '&:first-child': {
      borderLeft: '1px solid rgba(128, 128, 128, 0.21)',
    },
    fontSize: '30px',
    [theme.breakpoints.down('sm')]: {
      height: '80px',
      padding: '0 6px',
      fontSize: '22px',
    },
  },
  isActive_day: {
    '&:hover': {
      backgroundColor: '#3f51b5',
      color: '#fff',
    },
  },
  current_day: {
    fontWeight: 'bold',
  },
  cells_row: {
    display: 'flex',
    borderBottom: '1px solid rgba(128, 128, 128, 0.21)',
    '&:first-child': {
      borderTop: '1px solid rgba(128, 128, 128, 0.21)',
    },
  },
  disabled_day: {
    backgroundColor: 'rgba(128, 128, 128, 0.28)',
  },
  past_day: {
    color: 'rgba(48, 63, 159, 0.56)',
  },
  week_day__list: {
    display: 'flex',
    padding: 0,
    listStyleType: 'none',
  },
  week_day__item: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
    fontSize: '24px',
    [theme.breakpoints.down('sm')]: {
      height: '30px',
      fontSize: '20px',
    },
  },
  cell__overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover .events_counter': {
      backgroundColor: '#fff',
      color: '#3f51b5',
    },
    '&:hover .cell__add_btn': {
      display: 'block',
    }
  },
  cell__add_btn: {
    display: 'none',
    cursor: 'pointer',
  },
  events_counter_tooltip: {
    position: 'absolute',
    bottom: '2px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '95%',
    height: '36px',
    margin: '0 auto',
    padding: '4px 0',
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '6px',
    fontSize: '24px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  action_btn_container: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
});
