var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
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
router.use(cookieParser());
router.use(bodyParser.json());
router.use(passport.initialize())
/* GET users listing. */
router.post('/user', function (req, res, next) {

    const token = req.body.token
    console.log(token)
    let IDEmp = jwt.decode(token)
    console.log(IDEmp.ID)
    var sql = `SELECT NameEmp,LastNameEmp,Position,KKS1_factory FROM employee WHERE IDEmp="${IDEmp.ID}"`
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            })
        }
        // console.log(rows, fields)
        res.send(rows)
    })
});

/* GET users listing. */
router.get('/:kks1', function (req, res, next) {

    const {
        kks1
    } = req.params
    console.log(kks1, req.params)
    var sql = `SELECT running_equip.KKS,equipment.NameEquip,running_equip.DateStart,running_equip.DateExpired
,equipment.KKS4,equipment.Life_time,inventory.KKS4,inventory.KKS1,inventory.CountStock
    FROM running_equip,equipment,inventory 
    WHERE running_equip.KKS1 = "${kks1}"
    AND running_equip.KKS4 = equipment.KKS4
    AND running_equip.KKS4=inventory.KKS4 AND running_equip.KKS1=inventory.KKS1`;
    db.query(sql, function (err, rows, fields) {
        if (err) {
            res.status(500).send({
                error: 'Something failed!'
            })
        }
        // console.log(rows, fields)
        res.json(rows)
    })
});
module.exports = router;