const urlObject = require('url');
const fs = require('fs');
const getDataDb = require('./queries/getData');
const postDataDb = require('./queries/postData');

// const ct = 'Content-Type';
const html = (req, res, ct) => {
  staticfiles(req, res, 'index.html');
};
const staticfiles = (req, res, url) => {
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpeg: 'image/x-icon'
  }[url.split('.')[1]];
  fs.readFile(`${__dirname}/../public/${url}`, (err, file) => {
    if (err) {
      handleError(err, res);
    }
    res.writeHead(200, { 'content-type': extensionType });
    res.end(file);
  });
};

const handleError = (err, res) => {
  console.log('error with ', err);
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('an error has occured, sorry :(');
};
const getData = (req, res) => {
  getDataDb((err, result) => {
    if (err) handleError(err, res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result);
  });
};
const postData = (req, res, url) => {
  postDataDb(url.query, (err, result) => {
    if (err) handleError(err, res);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(result);
  });
};

module.exports = { html, staticfiles, handleError };
