import moment from 'moment';
import { forEach } from 'lodash';

const initDB = () => {
  const db = openDatabase('calendarDB', '1.0', 'calendar database', 2*1024*1024);
  db.transaction(function (tx) { 
    // event_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    tx.executeSql(`CREATE TABLE IF NOT EXISTS events (
      event_title VARCHAR(80) DEFAULT NULL, 
      event_desc TEXT, 
      event_start TEXT NOT NULL, 
      event_end TEXT NOT NULL
      )`); 
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("New Years Day", "Happy New Year", "2018-12-31 23:59:59", "2019-01-01 00:00:00")');
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("Last day of January", "Last day of month!!!", "2019-01-31 23:59:59", "2019-02-01 00:00:00")');
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 29 test", "test", "2018-10-29 00:00:00", "2018-10-29 23:59:59")');
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 28 test", "test", "2018-10-28 00:00:00", "2018-10-28 23:59:59")');
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 28 test 2", "test 2", "2018-10-28 00:00:00", "2018-10-28 20:59:59")');
    tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("November 5 test 2", "test", "2018-11-05 10:00:00", "2018-11-05 21:59:59")');
 });
}

const getDataFromDB = (startDate, endDate, callback) => {
  const db = openDatabase('calendarDB', '1.0', 'calendar database', 2*1024*1024);
  let events = [];
  db.transaction(function (tx) {
    tx.executeSql(`SELECT rowid, event_title, event_desc, event_start, event_end FROM events 
    WHERE event_start BETWEEN '${startDate}' AND '${endDate}' ORDER BY event_start`, [], (tx, result) => {
      const tableRows = result.rows;
      forEach(tableRows, (val) => {
        const day = moment(val.event_start, 'YYYY-MM-DD HH:mm:ss').date();
        if (events[day]) {
          events[day].push(val);
        } else {
          events[day] = [val];
        }
      });
      // console.log('utils events', events);
      callback(events);
    }, null);
  });
}

export {
  initDB,
  getDataFromDB,
}
