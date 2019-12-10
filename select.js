var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "p4f"

});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    sql = "select * from running_equipment ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
