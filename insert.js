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
    sql = `INSERT INTO running_equipment(IDpath, KKScode, DateStart,DateExpired) VALUES (UUID(),'10LAB10AA002','2019-12-10','2020-12-10')`
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Insert Complete!");

        
    })
});
