const initDB = () => {
  openDatabase('calendarDB', '1.0', 'calendar database', 2*1024*1024);
}

export {
  initDB,
}
