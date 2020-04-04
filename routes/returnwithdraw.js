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
    console.log(req.body)
    var selectcount = `SELECT inventory.CountStock,inventory.KKS4 FROM inventory,equipment WHERE equipment.NameEquip = '${req.body.NameEquip}' AND equipment.KKS4 = inventory.KKS4 AND inventory.KKS1 = '${req.body.KKS1}'`
    db.query(selectcount, function (err, rows, fields) {
        if (rows[0] === undefined) {
            res.send({
                error: "error"
            })
            console.log(rows)
        } else {
            let NewCountStock = rows[0].CountStock + req.body.CountADD
            var updateCountStock = `UPDATE inventory SET CountStock = '${NewCountStock}' WHERE KKS4 = '${rows[0].KKS4}' AND KKS1 = '${req.body.KKS1}'`;
            db.query(updateCountStock, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        err: console.error()
                    })
                }
            })
            var updatewithdraw = `UPDATE withdraw SET Count_withdraw = '0' WHERE IDEmp = '${req.body.IDEmp}'AND KKS4 = '${rows[0].KKS4}' AND KKS1 = '${req.body.KKS1}'`;
            db.query(updatewithdraw, function (err, rows, fields) {
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
            var checkbroke_equipment = `SELECT * FROM broke_equipment WHERE KKS1 = '${req.body.KKS1}'AND KKS4 = '${rows[0].KKS4}'`
            db.query(checkbroke_equipment, function (err, rows2, fields) {
                if (rows2[0] === undefined) {
                    var INSERTbroke_equipment = `INSERT INTO broke_equipment(KKS1,KKS4,CountBroke) VALUES('${req.body.KKS1}','${rows2[0].KKS4}', '${req.body.CountBroke}')`;
                    db.query(INSERTbroke_equipment, function (err, rows, fields) {
                        if (err) {
                            res.status(500).send({
                                err: console.error()
                            })
                        }
                        // console.log(rows, fields)
                        // res.send({
                        //     suscess: "create"
                        // })
                    })
                } else {
                    let Count_Broke = rows2[0].CountBroke + req.body.CountBroke
                    var UPDATEbroke_equipment = `UPDATE broke_equipment SET CountBroke = '${Count_Broke}' WHERE KKS4 = '${rows2[0].KKS4}' AND KKS1 = '${req.body.KKS1}'`;
                    db.query(UPDATEbroke_equipment, function (err, rows, fields) {
                        if (err) {
                            res.status(500).send({
                                err: console.error()
                            })
                        }
                        // res.send({
                        //     suscess: "update"
                        // })
                    })
                }
            })
            var INSERTloginventoryReturn = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${req.body.IDEmp}','${req.body.ProcessReturn}','${req.body.KKS1}','${rows[0].KKS4}','${req.body.CountADD}','${req.body.Datelog}')`;
            db.query(INSERTloginventoryReturn, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        err: console.error()

                    })
                }
            })
            var INSERTloginventoryBroke = `INSERT INTO loginventory(IDEmp,Process,KKS1,KKS4,CountLog,DateLog) VALUES('${req.body.IDEmp}','${req.body.ProcessBroke}','${req.body.KKS1}','${rows[0].KKS4}','${req.body.CountBroke}','${req.body.Datelog}')`;
            db.query(INSERTloginventoryBroke, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        err: console.error()

                    })
                }
            })
        }
    })
});

module.exports = router;