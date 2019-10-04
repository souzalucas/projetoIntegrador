const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wbfubu64',
    database: 'estadio'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

console.log(connection);

module.exports = connection;