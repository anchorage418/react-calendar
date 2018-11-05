export default () => ({
  calendar__root: {

  },
  calendar_header: {

  },
  calendar_body: {
    // width: '500px',
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
    // fontWeight: 'bold',
    fontSize: '30px',
    // '&:hover': {
    //   backgroundColor: '#3f51b5',
    //   color: '#fff',
    // },
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
  },
  // events_tooltip: {
  //   position: 'absolute',
  //   bottom: 0,
  //   right: 0,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '0',
  //   height: '0',
  //   borderBottom: '70px solid #303f9f',
  //   borderLeft: '70px solid transparent',
  //   cursor: 'pointer',
  // },
  // tooltip__value: {
  //   position: 'relative',
  //   top: '49px',
  //   right: '25px',
  //   color: '#fff',
  // },
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '50%',
    fontSize: '24px',
    cursor: 'pointer',
  },
});
