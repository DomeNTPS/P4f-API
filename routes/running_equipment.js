var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/:kkscode', function(req, res, next) {
  
  const { kkscode } = req.params
  console.log(kkscode,req.params)
  var sql = `SELECT KKS,DateStart,DateExpired,NameEquip,URLimage,CountStock,inventory.KKS1,inventory.KKS4 FROM running_equip,equipment,inventory WHERE KKS="${kkscode}" AND running_equip.KKS4=equipment.KKS4 
  AND running_equip.KKS4=inventory.KKS4 AND running_equip.KKS1=inventory.KKS1`
  ;
  db.query(sql, function (err, rows, fields) {
  if (err) {
    res.status(500).send({
      error: 'Something failed!'
    })
  }
  console.log(rows,fields)
  res.json(rows[0])
  })
  });

module.exports = router;
