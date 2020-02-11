const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '35.240.203.149',
    port: 3306,
    user: 'admin',
    password: 'Chalermwut13',
    database: 'p4f'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected!');
});



module.exports = connection;
