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

const routeStaticfiles = {
  '/': html,
  '/main.css': staticfiles,
  '/dom.js': staticfiles,
  '404': handleError
};
const routeDataHandler = {
  '/getData': getData,
  '/postData': postData,
  '404': handleError
};

const router = (req, res) => {
  console.log(req.url);
  if (routeStaticfiles[req.url]) {
    routeStaticfiles[req.url](req, res, req.url);
  } else {
    const url = urlObject.parse(req.url, true);
    if (routeDataHandler[url.pathname]) {
      routeDataHandler[url.pathname](req, res, url);
    } else {
      routeDataHandler[404](' 404, page not found', res);
    }
  }
};

module.exports = router;
