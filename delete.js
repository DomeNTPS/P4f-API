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
    sql = `delete from product where IDpath=......`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Delete Complete!");

    
    })
});
