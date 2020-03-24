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
    //  console.log(req.body)
    //  console.log("-------------------------------------------------------")

    
    //  console.log(req.body.KKS4_Equip_Withdraw)
    //  console.log(req.body.Count_withdraw)
    //  console.log(req.body.Date_Withdraw)
    //  var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('1379900073717', 'AA',' 1','2020-02-07')`;
    // var check = `SELECT * FROM withdraw WHERE IDEmp = '1409800338149'AND KKS1 = '10'AND KKS4 = 'AA'`
    var check = `SELECT * FROM withdraw WHERE IDEmp = '${IDEmp.ID}'AND KKS1 = '${req.body.KKS1_Factory_withdraw}'AND KKS4 = '${req.body.KKS4_Equip_Withdraw}'`
    db.query(check, function (err, rows, fields){
        if(rows[0]===undefined){
            var sql = `INSERT INTO withdraw(IDEmp,KKS1,KKS4,Count_withdraw) VALUES('${IDEmp.ID}','${req.body.KKS1_Factory_withdraw}','${req.body.KKS4_Equip_Withdraw}', '${req.body.Count_withdraw}')`;
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
            var sql = `UPDATE inventory SET Count_withdraw = '${req.body.Count_withdraw}' WHERE IDEmp = '${IDEmp.ID}'AND KKS4 = '${req.body.KKS4}' AND KKS1 = '${req.body.KKS1}'`;
            db.query(sql, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                    err : console.error()
                })
            res.send({
                suscess: "update"
            })
        }
    })
    // var sql = `INSERT INTO withdraw(IDEmp,KKS1,KKS4,Count_withdraw,Date_Withdraw) VALUES('${IDEmp.ID}','${req.body.KKS1_Equip_Withdraw}','${req.body.KKS4_Factory_withdraw}', '${req.body.Count_withdraw}','${req.body.Date_Withdraw}')`;
    // db.query(sql, function (err, rows, fields) {
    //     if (err) {
    //         res.status(500).send({
    //            err : console.error()
                
    //         })
    //     }
    //     // console.log(rows, fields)
    //     res.send({
    //         suscess: "good"
    //     })
    }
    })
});

module.exports = router;