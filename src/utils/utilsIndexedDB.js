import moment from 'moment';

const initDB = () => {
  if (window && window.indexedDB) {
    const request = window.indexedDB.open('calendarDB', 3);
    const data = [
      { event_title: 'October 28 test', event_desc: 'test', event_start: '2018-10-28 00:00:00', event_end: '2018-10-28 23:59:59' },
      { event_title: 'October 28 test 2', event_desc: 'test 2', event_start: '2018-10-28 02:00:00', event_end: '2018-10-28 20:59:59' },
    ];
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore('events', { keyPath: "event_id", autoIncrement: true });
      objectStore.createIndex('event_title', 'event_title', { unique: false });
      objectStore.createIndex('event_desc', 'event_desc', { unique: false });
      objectStore.createIndex('event_start', 'event_start', { unique: false });
      objectStore.createIndex('event_end', 'event_end', { unique: false });
      objectStore.transaction.oncomplete = function(event) {
        const eventsObjectStore = db.transaction('events', 'readwrite').objectStore('events');
        data.forEach(function(data_event) {
          eventsObjectStore.add(data_event);
        });
      };
    }
  }

//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("New Years Day", "Happy New Year", "2018-12-31 23:59:59", "2019-01-01 00:00:00")');
//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("Last day of January", "Last day of month!!!", "2019-01-31 23:59:59", "2019-02-01 00:00:00")');
//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 29 test", "test", "2018-10-29 00:00:00", "2018-10-29 23:59:59")');
//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 28 test", "test", "2018-10-28 00:00:00", "2018-10-28 23:59:59")');
//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("October 28 test 2", "test 2", "2018-10-28 00:00:00", "2018-10-28 20:59:59")');
//     tx.executeSql('INSERT INTO events (event_title, event_desc, event_start, event_end) VALUES ("November 5 test 2", "test", "2018-11-05 10:00:00", "2018-11-05 21:59:59")');
//  });
}

const getDataFromDB = (startDate, endDate, callback) => {
  const startDateMoment = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
  const endDateMoment = moment(endDate, 'YYYY-MM-DD HH:mm:ss');

  if (window && window.indexedDB) {
    const DBOpenRequest = window.indexedDB.open('calendarDB', 3);
    // let db;
    DBOpenRequest.onsuccess = function(event) {
      const db = DBOpenRequest.result;
      const transaction = db.transaction('events', 'readonly');
      const objectStore = transaction.objectStore('events');
  
      let matchedEvents = [];

      const eventStartIndex = objectStore.index('event_start');
      eventStartIndex.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
          const { event_start, event_end } = cursor.value;
          const eventStartMoment = moment(event_start, 'YYYY-MM-DD HH:mm:ss');
          const eventEndMoment = moment(event_end, 'YYYY-MM-DD HH:mm:ss');
          if (moment(eventStartMoment).isSameOrAfter(startDateMoment) && moment(eventEndMoment).isSameOrBefore(endDateMoment)) {
            matchedEvents.push(cursor.value);
          }
          cursor.continue();
        } else {
          console.log('matchedEvents 1', matchedEvents);
          callback(matchedEvents);
        }
      }

      console.log('matchedEvents 2', matchedEvents);
    };
  }


  // const db = openDatabase('calendarDB', '1.0', 'calendar database', 2*1024*1024);
  // let events = [];
  // db.transaction(function (tx) {
  //   tx.executeSql(`SELECT rowid, event_title, event_desc, event_start, event_end FROM events 
  //   WHERE event_start BETWEEN '${startDate}' AND '${endDate}' ORDER BY event_start`, [], (tx, result) => {
  //     const tableRows = result.rows;
  //     forEach(tableRows, (val) => {
  //       const day = moment(val.event_start, 'YYYY-MM-DD HH:mm:ss').date();
  //       if (events[day]) {
  //         events[day].push(val);
  //       } else {
  //         events[day] = [val];
  //       }
  //     });
  //     // console.log('utils events', events);
  //     callback(events);
  //   }, null);
  // });
}


export {
  initDB,
  getDataFromDB,
}