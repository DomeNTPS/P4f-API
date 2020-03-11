const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.87.152.9',
    port: 3306,
    user: 'root',
    password: 'example',
    database: 'p4f'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected!');
});



module.exports = connection;
