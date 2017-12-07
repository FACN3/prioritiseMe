const http = require('http');
const router = require('./router.js');

const port = process.env.PORT || 3000;
const server = http.createServer(router);

server.listen(port, () => {
  console.log(`The Port is open on ${port} head to http://localhost:${port} to access the site`);
});
