var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/selectcount', function (req, res, next) {
    var sql = `SELECT Count_withdraw FROM withdraw WHERE withdraw.NameEquip = '${req.body.NameEquip}' AND withdraw.KKS4 = '${req.body.KKS4}' AND withdraw.KKS1 = '${req.body.KKS1}'AND IDEMP='${req.body.IDEmp}'`
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
            err : console.error()
        })
        }
        console.log(rows)
        res.send(rows)
    })
});
router.post('/', function (req, res, next) {

    // console.log(req.body)
    // console.log('------------------')
    // console.log(req.body.CountStock)
    // console.log(req.body.KKS4)
    // console.log(req.body.KKS1)
    var sql = `UPDATE withdraw SET Count_withdraw = '${req.body.Countwithdraw}' WHERE KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}' AND IDEMP='${req.body.IDEmp}'`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            })
        }
        // console.log(rows, fields)
        res.send({
            suscess : "good"
        })
    })
});

module.exports = router;