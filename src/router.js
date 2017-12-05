const http = require('http');
const fs = require('fs');
const pg = require('pg');
const urlObject = require('url');
const {
  html,
  staticfiles,
  getData,
  postData,
  handleError
} = require('./handler');

const routes = {
  '/': html,
  '/style.css': staticfiles,
  '/dom.js': staticfiles,
  '/getData': getData,
  '/postData': postData,
  '404': handleError
};

const router = (req, res) => {
  const url = urlObject.parse(req.url, true);
  console.log('url pathname is ', url.pathname);
  if (routes[url.pathname]) {
    routes[url.pathname](req, res, url);
  } else {
    handleError(res);
  }
};

module.exports = router;
