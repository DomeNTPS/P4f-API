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
router.get('/:token', function (req, res, next) {
            
    const {token} = req.params
    console.log(req.params)
    let IDEmp = jwt.decode(token)
    console.log(IDEmp.ID)
    var sql = `SELECT NameEquip,CountStock FROM equipment,inventory,employee
            WHERE IDEmp = "${IDEmp.ID}"
            AND inventory.KKS1 = employee.KKS1_factory AND inventory.KKS4 = equipment.KKS4`;
    db.query(sql, function (err, rows, fields) {
          if (err) {st:5000/
                    res.send(rows)
                }
            console.log(rows)
            res.json(rows)
           }) 
        });
module.exports = router;