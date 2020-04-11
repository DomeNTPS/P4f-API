var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.post('/withdraw', function (req, res, next) {
    console.log(req.body)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,DateLog,CountLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${req.body.Year}-${req.body.Month}-01"
    AND "${req.body.Year}-${req.body.Month}-31"
    AND loginventory.KKS1 = "${req.body.KKS1}"
    AND loginventory.Process = "WithdrawEquipment"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        console.log(rows)
        res.json(rows)
    })
});
router.post('/add', function (req, res, next) {
    console.log(req.body)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,DateLog,CountLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${req.body.Year}-${req.body.Month}-01"
    AND "${req.body.Year}-${req.body.Month}-31"
    AND loginventory.KKS1 = "${req.body.KKS1}"
    AND loginventory.Process = "AddEquipment"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        // console.log(rows)
        res.json(rows)
    })
});
router.post('/changeequipment', function (req, res, next) {
    console.log(req.body)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,loginventory.KKSCode,DateLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${req.body.Year}-${req.body.Month}-01"
    AND "${req.body.Year}-${req.body.Month}-31"
    AND loginventory.KKS1 = "${req.body.KKS1}"
    AND loginventory.Process = "ChangeEquipment"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        // console.log(rows)
        res.json(rows)
    })
});
router.post('/return', function (req, res, next) {
    console.log(req.body)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,DateLog,CountLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${req.body.Year}-${req.body.Month}-01"
    AND "${req.body.Year}-${req.body.Month}-31"
    AND loginventory.KKS1 = "${req.body.KKS1}"
    AND loginventory.Process = "ReturnEquipment"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        // console.log(rows)
        res.json(rows)
    })
});
router.post('/broke', function (req, res, next) {
    console.log(req.body)
    var sql = `SELECT NameEmp,LastNameEmp,employee.IDEmp,NameEquip,DateLog,CountLog
    FROM employee,equipment,loginventory
    WHERE DateLog BETWEEN "${req.body.Year}-${req.body.Month}-01"
    AND "${req.body.Year}-${req.body.Month}-31"
    AND loginventory.KKS1 = "${req.body.KKS1}"
    AND loginventory.Process = "EquipmentBroke"
    AND employee.IDEmp = loginventory.IDEmp AND loginventory.KKS4 = equipment.KKS4`;
    // var sql = `SELECT *
    // FROM withdraw
    // WHERE Date_withdraw = "${datetime}-01"`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        // console.log(rows)
        res.json(rows)
    })
});
module.exports = router;
