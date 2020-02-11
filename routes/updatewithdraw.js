var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.post('/', function (req, res, next) {

    // console.log(req.body)
    // console.log('------------------')
    // console.log(req.body.CountStock)
    // console.log(req.body.KKS4)
    // console.log(req.body.KKS1)
    // var sql = `UPDATE inventory SET CountStock = '80' WHERE KKS4 = 'AA' AND KKS1 = '10'`;
    var sql = `UPDATE inventory SET CountStock = '${req.body.CountStock}' WHERE KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`;
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