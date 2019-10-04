
const express = require('express');
const routes = require('./routes');
//criar server
const server = express();

//Dizer para xpress utilizar json
server.use(express.json());

server.use(routes);

//Sobe o servidor e escuta na porta 8000
server.listen(3000);



// module.exports = server;
