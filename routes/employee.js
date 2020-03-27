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

router.post("/",async function(req, res, next) {
  try {
  const { ID, Pass } = req.body
    var sql = `SELECT * FROM employee WHERE IDEmp="${ID}"`
    await db.query(sql, function(err, rows, fields) {
          if (err) {
            res.status(500).send({ defaultAnimationDialog: true })
          }
          // console.log(rows[0])
          let userInfo = rows[0]
          if (ID && Pass) {
            // console.log("-----",userInfo)
            if (!userInfo) {
              // console.log("1")
     
              res.status(401).json({ defaultAnimationDialog: true })
              return
            }
            if (userInfo.Password === Pass) {
              // from now on we'll identify the user by the id and the id is the 
              // only personalized value that goes into our token
              let payload = { ID : userInfo.IDEmp }
              let token = jwt.sign(payload, jwtOptions.secretOrKey)
              res.send({ token: token, Position : userInfo.Position,KKS1 :userInfo.KKS1_factory ,defaultAnimationDialog: false })
              return
            } else {
              res.status(401).json({ defaultAnimationDialog: true })
              return
            }
          }
          else{
            setAnimationDialog({ defaultAnimationDialog: true })
            return
          }
        })
      } catch (err) {
        console.log('err:',err)
        setAnimationDialog({ defaultAnimationDialog: true })
      }

  })

  router.post("/web",async function(req, res, next) {
    try {
      const { ID, Pass } = req.body
      var sql = `SELECT * FROM employee WHERE IDEmp="${ID}"`
      await db.query(sql, function(err, rows, fields) {
            if (err) {
              res.status(500).send({ defaultAnimationDialog: true })
            }
            console.log(rows[0])
            let userInfo = rows[0]
            if (ID && Pass) {
              if (!userInfo) {
                console.log("1")
                res.status(401).json({ defaultAnimationDialog: true })
                return
              }
              if (userInfo.Password === Pass) {
                console.log("2")
                if(userInfo.Position == "Admin"){
                  let payload = { ID : userInfo.IDEmp }
                  let token = jwt.sign(payload, jwtOptions.secretOrKey)
                  return res.send({ 
                    token: token,
                    user : userInfo.NameEmp,
                    KKS1 :userInfo.KKS1_factory})
                }else{
                  console.log("3")
                  res.status(401).json({ defaultAnimationDialog: true })
                  return
                }
              } else {
                console.log("4")
                res.status(401).json({ defaultAnimationDialog: true })
                return
              }
            }
            else{
              console.log(ID)
              console.log("5")
              res.status(401).json({ defaultAnimationDialog: true })
              return
            }
          })
        } catch (err) {
          console.log('err:',err)
          res.status(401).json({ defaultAnimationDialog: true })
        }
  
    })
    
        
module.exports = router
