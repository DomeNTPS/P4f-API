var express = require("express")
var router = express.Router()
var db = require("../db")
var bodyParser = require("body-parser")


const cookieParser = require('cookie-parser')
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

// use the strategy

router.use(passport.initialize())
router.use(bodyParser.json())
router.use(cookieParser());
router.get("/allID",async function(req, res, next) {
    
    var sql = `SELECT IDEmp FROM employee`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        console.log(rows)
        res.json(rows)
    })
})
router.get('/allName/:IDEmp', function (req, res, next) {
    const {
      IDEmp
    } = req.params
    console.log(req.params)
    var sql = `SELECT NameEquip
  FROM withdraw,equipment
  WHERE withdraw.IDEmp = "${IDEmp}" AND withdraw.KKS4 = equipment.KKS4 `;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        console.log(rows)
        res.json(rows)
    })
})
router.post('/Count', function (req, res, next) {

    var sql = `SELECT Count_withdraw
  FROM withdraw,equipment
  WHERE equipment.NameEquip = "${req.body.NameEquip}" AND withdraw.IDEmp = "${req.body.IDEmp}" AND withdraw.KKS4 = equipment.KKS4 `;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.send(rows)
        }
        console.log(rows)
        res.json(rows[0])
    })
})        

module.exports = router
