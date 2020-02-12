var express = require("express");
var router = express.Router();
var db = require("../db");
var bodyParser = require("body-parser");
import jwt from "react-native-pure-jwt";
router.use(bodyParser.json());
/* GET users listing. */
router.post("/", function(req, res, next) {
  console.log(req.body);
  //  console.log("-------------------------------------------------------")

  //  console.log(req.body)
  console.log(req.body.ID);
  console.log(req.body.Pass);
  //  console.log(req.body.Date_Withdraw)
  //  var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('1379900073717', 'AA',' 1','2020-02-07')`;

  var sql = `SELECT IDEmp,Position,KKS1_factory FROM employee WHERE IDEmp="${req.body.ID}" AND Password="${req.body.Pass}"`;
  db.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send({
        err: console.error()
      });
    }
    // console.log(rows, fields)
    console.log(rows[0].IDEmp);
    res.send(rows[0]);
  });
});

module.exports = router;
