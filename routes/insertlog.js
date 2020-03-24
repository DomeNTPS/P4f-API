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
    let token = req.body.token
    let IDEmp = jwt.decode(token)
    // console.log(req.body)
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")
    //  var sql = `INSERT INTO addinventory(KKS1,KKS4,CountIN,DateIN) VALUES('AA', '01','1','2020-02-07')`;

     var sql = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${IDEmp.ID}','${req.body.Process}','${req.body.KKS1}','${req.body.KKS4}','${req.body.Countlog}','${req.body.Datelog}')`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
               err : console.error()
                
            })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "good"
        })
    })
});
router.post('/web', function (req, res, next) {
    // console.log(req.body)
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")
    //  var sql = `INSERT INTO addinventory(KKS1,KKS4,CountIN,DateIN) VALUES('AA', '01','1','2020-02-07')`;

     var sql = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${req.body.IDEmp}','${req.body.Process}','${req.body.KKS1}','${req.body.KKS4}','${req.body.Countlog}','${req.body.Datelog}')`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
               err : console.error()
                
            })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "good"
        })
    })
});


module.exports = router;