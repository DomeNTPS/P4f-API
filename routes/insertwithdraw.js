var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/', function (req, res, next) {
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")

    //  console.log(req.body)
    //  console.log(req.body.KKS4_Equip_Withdraw)
    //  console.log(req.body.Count_withdraw)
    //  console.log(req.body.Date_Withdraw)
     var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('1379900073717', 'AA',' 1','2020-02-07')`;

     var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('${req.body.IDEmp}', '${req.body.KKS4_Equip_Withdraw}', '${req.body.Count_withdraw}','${req.body.Date_Withdraw}')`;
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