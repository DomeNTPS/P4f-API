var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

// import passport and passport-jwt modules
const passport = require('passport')
const passportJWT = require('passport-jwt')
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'wowwow'
router.use(bodyParser.json());
router.use(passport.initialize())

router.post('/', function (req, res, next) {
    // console.log(req.body)
    var selectcount = `SELECT inventory.CountStock,inventory.KKS4 FROM inventory,equipment WHERE equipment.NameEquip = '${req.body.NameEquip}' AND equipment.KKS4 = inventory.KKS4 AND inventory.KKS1 = '${req.body.KKS1}'`
    db.query(selectcount, function (err, rows, fields) {   
    if (rows[0] === undefined) {
        res.send({
                error: "error"
            })
    } else {
        let NewCountStock = rows[0].CountStock + req.body.CountADD
        console.log(NewCountStock)
        var updateCountStock = `UPDATE inventory SET CountStock = '${NewCountStock}' WHERE KKS4 = '${rows[0].KKS4}' AND KKS1 = '${req.body.KKS1}'`;
        db.query(updateCountStock, function (err, rows, fields) {
            if (err) {
                res.status(500).send({
                    err: console.error()
                })
            }
        })
        let token = req.body.token
        let IDEmp = jwt.decode(token)
        var INSERTloginventory = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${IDEmp.ID}','${req.body.Process}','${req.body.KKS1}','${rows[0].KKS4}','${req.body.CountADD}','${req.body.Datelog}')`;
        db.query(INSERTloginventory, function (err, rows, fields) {
            if (err) {
                res.status(500).send({
                    err: console.error()
                })
            }
            // console.log(rows, fields)
            res.send({
                suscess: "suscess"
            })
        })
        }
    })
});

module.exports = router;