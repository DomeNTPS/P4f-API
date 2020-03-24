var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/:datetime', function (req, res, next) {

    const {
        datetime
    } = req.params
    console.log(req.params)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,Process,DateLog,CountLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${datetime}-01" AND "${datetime}-31"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            })
        }
        console.log(rows)
        res.json(rows)
    })
});

module.exports = router;
