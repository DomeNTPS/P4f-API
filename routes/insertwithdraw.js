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
    let token = req.body.token
    let IDEmp = jwt.decode(token)
    var insertlog = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${IDEmp.ID}','${req.body.Process}','${req.body.KKS1}','${req.body.KKS4}','${req.body.Count_withdraw}','${req.body.Datelog}')`;
    db.query(insertlog, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                err: console.error()

            })
        }
    })
    var checkwithdraw = `SELECT * FROM withdraw WHERE IDEmp = '${IDEmp.ID}'AND KKS1 = '${req.body.KKS1}'AND KKS4 = '${req.body.KKS4}'`
    db.query(checkwithdraw, function (err, rows,fields){
        if(rows[0]===undefined){
            var sql = `INSERT INTO withdraw(IDEmp,KKS1,KKS4,Count_withdraw) VALUES('${IDEmp.ID}','${req.body.KKS1}','${req.body.KKS4}', '${req.body.Count_withdraw}')`;
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                    err : console.error()
                })
        }
        // console.log(rows, fields)
        res.send({
            suscess: "create"
        })
    })
        }else{
            let Count_withdrawNew = rows[0].Count_withdraw + req.body.Count_withdraw
            console.log(Count_withdrawNew)
            var sql = `UPDATE withdraw SET Count_withdraw = '${Count_withdrawNew}' WHERE IDEmp = '${IDEmp.ID}'AND KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`;
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                    err : console.error()
                })
        }
        res.send({
            suscess: "update"
        })
    })
    }
    })
    var sql = `UPDATE inventory SET CountStock = '${req.body.CountStock}' WHERE KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                err: console.error()
            })
        }
        // console.log(rows)
        // res.send(rows)
    })
});

module.exports = router;