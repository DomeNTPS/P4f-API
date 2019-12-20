var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/:kkscode', function(req, res, next) {
  
  const { kkscode } = req.params
  console.log(kkscode,req.params)
  var sql = `SELECT * FROM running_equipment WHERE KKScode="${kkscode}"`;
  db.query(sql, function (err, rows, fields) {
  if (err) {
    res.status(500).send({
      error: 'Something failed!'
    })
  }
  console.log(rows,fields)
  res.json(rows)
  })
  });

module.exports = router;
