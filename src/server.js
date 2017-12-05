const http = require('http');
const router = require('./router.js');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const server = http.createServer(router);

server.listen(port, () => {
  console.log(`The Port is open on ${port} go to localhost:${port}`);
});
