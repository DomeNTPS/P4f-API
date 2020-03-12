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
    console.log(datetime, req.params)
    var sql = `SELECT NameEmp,LastNameEmp,NameEquip,employee.IDEmp,KKS_Equip_Withdraw,Date_withdraw,Count_withdraw
    FROM employee,equipment,running_equip,withdraw
    WHERE Date_withdraw BETWEEN "${datetime}-01" AND "${datetime}-31"
    AND employee.IDEmp = withdraw.IDEmp AND withdraw.KKS4_Equip_Withdraw = equipment.KKS4 AND withdraw.KKS_Equip_Withdraw=running_equip.KKS`;
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
