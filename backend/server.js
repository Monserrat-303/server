const http = require('http');
const port = process.env.PORT || 4000;
const app = require('./app');
const holamundo = require('./api/holamundo');

const server = http.createServer(holamundo);
console.log('running on port', port)
server.listen(port);