export default () => ({
  cell: {
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '30px',
    height: '30px',
  },
});
