const fs = require('fs');
const connect = require('./db_connection');

const buildScript = fs.readFileSync(`${__dirname}/db_build.sql`, 'utf8');

connect.query(buildScript, (err, res) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('database build in DA HOUSE!');
  connect.end(); //ending because this is run once to build table, this is not a server side script that is accessing the database many times
});
