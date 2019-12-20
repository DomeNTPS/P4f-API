var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/:id', function (req, res, next) {

    const {
        id
    } = req.params
    console.log(id, req.params)
    var sql = `SELECT ID,Passwords,Position FROM employee WHERE ID="${id}"`;
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
