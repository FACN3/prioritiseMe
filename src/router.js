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
  '/main.css': staticfiles,
  '/dom.js': staticfiles,
  '/getData': getData,
  '/postData': postData,
  '404': handleError
};

const router = (req, res) => {
  if (routes[req.url]) {
    routes[req.url](req, res, req.url);
  } else {
    const url = urlObject.parse(req.url);
    if(routes[url.pathname]){
      routes[url.pathname](req, res);
    }
    routes[404](' 404, page not found', res);
  }
};

module.exports = router;
