var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.post('/', function (req, res, next) {
    // console.log(req.body)
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")
    //  var sql = `INSERT INTO addinventory(KKS1,KKS4,CountIN,DateIN) VALUES('AA', '01','1','2020-02-07')`;

     var sql = `INSERT INTO addinventory(KKS1,KKS4,CountIN,DateIN) VALUES('${req.body.KKS1}','${req.body.KKS4}','${req.body.CountIn}','${req.body.DateIn}')`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
               err : console.error()
                
            })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "good"
        })
    })
});

router.post('/return', function (req, res, next) {
    // console.log(req.body)
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")
    //  var sql = `INSERT INTO addinventory(KKS1,KKS4,CountIN,DateIN) VALUES('AA', '01','1','2020-02-07')`;

     var sql = `INSERT INTO returninventory(IDEmp,KKS1,KKS4,CountReturn,DateReturn) VALUES('${req.body.IDEmp}','${req.body.KKS1}','${req.body.KKS4}','${req.body.CountReturn}','${req.body.DateReturn}')`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
               err : console.error()
                
            })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "good"
        })
    })
});

module.exports = router;