const { Pool } = require('pg');
require('env2')('config.env'); //env will store environement variables in config.env

if (!process.env.DATABASE_URL)
  throw new Error('Environment variable DATABASE_URL must be set');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = pool;
