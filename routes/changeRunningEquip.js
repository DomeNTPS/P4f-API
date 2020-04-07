var express = require("express")
var router = express.Router()
var db = require("../db")
var bodyParser = require("body-parser")


const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')
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

// use the strategy

router.use(passport.initialize())
router.use(bodyParser.json())
router.use(cookieParser());
router.get("/setKKS/:token", async function (req, res, next) {
    const {
        token
    } = req.params
    let IDEmp = jwt.decode(token)
    console.log(IDEmp.ID)
    //   console.log(req.params)
    var sql = `SELECT KKS,NameEquip FROM running_equip,employee,equipment WHERE IDEmp = '${IDEmp.ID}' AND employee.KKS1_factory=running_equip.KKS1 AND equipment.KKS4=running_equip.KKS4`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        // console.log(rows)
        res.json(rows)
    })
})
router.get('/setName/:KKS', function (req, res, next) {
    const {
        KKS
    } = req.params
    // console.log(req.params)
    var sql = `SELECT NameEquip
  FROM running_equip,equipment
  WHERE KKS = "${KKS}" AND running_equip.KKS4 = equipment.KKS4 `;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        console.log(rows)
        res.json(rows)
    })
})
router.post('/updaterunning', function (req, res, next) {
    console.log(req.body)
    let IDEmp = jwt.decode(req.body.token)
    console.log(IDEmp.ID)
    console.log(req.body.KKS)
    var SelectLifetime = `SELECT Life_time,running_equip.KKS4,running_equip.KKS1
    FROM running_equip,equipment
    WHERE running_equip.KKS = "${req.body.KKS}"
    AND equipment.KKS4 = running_equip.KKS4`;
    db.query(SelectLifetime, function (err, rows, fields) {
         if (rows[0] === undefined) {
            res.send({
                error: "error"
            })
            console.log(rows)
        } else {
            let now = dayjs().format('YYYY-MM-DD HH:mm:ss')
            let DateExpried = dayjs(now).add((rows[0].Life_time), 'd').format('YYYY-MM-DD HH:mm:ss')
            // console.log(now)
            // console.log(DateExprie);
            var updateRunningEquip = `UPDATE running_equip SET DateStart = '${now}', DateExpired = '${DateExpried}' WHERE KKS = '${req.body.KKS}'`;
            db.query(updateRunningEquip, function (err, rows, fields) {
                if (err) {
                    res.status(500).send({
                        err: console.error()
                    })
                }
            })
            var SelectCountwithdraw = `SELECT Count_withdraw FROM withdraw WHERE IDEmp = '${IDEmp.ID}' AND KKS4 = '${rows[0].KKS4}' AND KKS1 = '${rows[0].KKS1}'`
             db.query(SelectCountwithdraw, function (err2, rows2, fields2) {
                if (rows2[0] === undefined) {
                    res.status(500).send({
                        err2: console.error()
                    })
                }else{
                    let withdrawupdate = rows2[0].Count_withdraw - 1
                    var updatewithdraw = `UPDATE withdraw SET Count_withdraw = '${withdrawupdate}' WHERE IDEmp = '${IDEmp.ID}'AND KKS4 = '${rows2[0].KKS4}' AND KKS1 = '${rows2[0].KKS1}'`;
                    db.query(updatewithdraw, function (err, rows, fields) {
                    if (err) {
                        res.status(500).send({
                            err: console.error()
                            })
                        }
                        // console.log(rows, fields)
                        // res.send({
                        //     suscess: "suscess"
                        // })
                    })
                }
                
            // })
            // var INSERTloginventoryUse = `INSERT INTO loginventory(IDEmp,Process,KKSCode,KKS1,KKS4,CountLog,DateLog) VALUES('${IDEmp.ID}','ChangeEquipment','${req.body.KKS}','${rows[0].KKS1}','${rows[0].KKS4}',1,'${req.body.DateStart}')`;
            // db.query(INSERTloginventoryUse, function (err, rows, fields) {
            //     if (err) {
            //         res.status(500).send({
            //             err: console.error()

            //         })
            //     }
            // })
        }
    })
})

module.exports = router
