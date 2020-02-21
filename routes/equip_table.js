var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/:kkscode', function (req, res, next) {

    const {
        kkscode
    } = req.params
    console.log(kkscode, req.params)
    var sql = `SELECT running_equip.KKS,running_equip.KKS1,equipment.NameEquip,running_equip.KKS4,running_equip.DateStart,running_equip.DateExpired
,equipment.KKS4,equipment.Lift_time,inventory.KKS4,inventory.KKS1,inventory.CountStock
    FROM running_equip,equipment,inventory 
    WHERE running_equip.KKS1 = "${kkscode}"
    AND running_equip.KKS4 = equipment.KKS4
    AND running_equip.KKS4=inventory.KKS4 AND running_equip.KKS1=inventory.KKS1`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            })
        }
        console.log(rows, fields)
        res.json(rows)
    })
});

module.exports = router;