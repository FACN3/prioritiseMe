const connect = require('../database/db_connection');

const getData = (query, cb) => {
  connect.query(
    'select tasks.id,tasks.description,tasks.priority,tasks.time_started, tasks.time_finished, tasks.user_id, users.name from tasks inner join users on users.id=tasks.user_id where tasks.user_id = $1',
    [query.user],
    (err, res) => {
      if (err) cb(err);
      const { rows: tasks } = res;
      cb(null, tasks);
    }
  );
};

const getDataAll = (query, cb) => {
  connect.query(
    'select tasks.id,tasks.description,tasks.priority,tasks.time_started, tasks.time_finished, tasks.user_id, users.name from tasks inner join users on users.id=tasks.user_id',
    (err, res) => {
      if (err) cb(err);
      const { rows: tasks } = res;
      cb(null, tasks);
    }
  );
};

const getUsers = cb => {
  connect.query('Select * From users', (err, res) => {
    if (err) cb(err);
    const { rows: users } = res;
    cb(null, users);
  });
};

module.exports = { getData, getDataAll, getUsers };
