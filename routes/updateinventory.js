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
router.post('/selectcount', function (req, res, next) {
    var sql = `SELECT inventory.CountStock,inventory.KKS1,inventory.KKS4 FROM inventory,equipment WHERE equipment.NameEquip = '${req.body.NameEquip}' AND equipment.KKS4 = inventory.KKS4 AND inventory.KKS1 = '${req.body.KKS1}'`
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
    console.log(req.body)
    var sql = `UPDATE inventory SET CountStock = '${req.body.CountStock}' WHERE KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`
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

module.exports = router;