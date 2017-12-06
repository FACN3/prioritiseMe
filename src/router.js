const http = require('http');
const fs = require('fs');
const pg = require('pg');
const urlObject = require('url');
const {
  html,
  staticfiles,
  getData,
  getDataAll,
  postData,
  handleError
} = require('./handler');

const routes = {
  '/': html,
  '/main.css': staticfiles,
  '/dom.js': staticfiles,
  '/getData': getData,
  '/getDataAll': getDataAll,
  '/postData': postData,
  '404': handleError
};

const router = (req, res) => {
  console.log(req.url);
  if (routes[req.url]) {
    routes[req.url](req, res, req.url);
  } else {
    const url = urlObject.parse(req.url, true);
    if (routes[url.pathname]) {
      routes[url.pathname](req, res, url);
    } else {
      routes[404](' 404, page not found', res);
    }
  }
};

module.exports = router;
