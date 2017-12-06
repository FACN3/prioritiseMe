const connect = require('../database/db_connection');

const postData = (values, cb) => {
  connect.query(
    'insert into tasks (description, priority, time_started,user_id)values($1,$2,$3,$4)',
    [values.description, values.priority, date.Now(), values.user_id],
    (err, res) => {
      if (err) cb(err);
      cb(null, JSON.stringify({ success: 'success' }));
    }
  );
};
