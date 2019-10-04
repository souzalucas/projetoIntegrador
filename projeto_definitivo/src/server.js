
const express = require('express');
const routes = require('./routes');
//criar server
const server = express();

   //Sobe o servidor e escuta na porta 8000
server.listen(3000);

server.use(routes);

// module.exports = server;
