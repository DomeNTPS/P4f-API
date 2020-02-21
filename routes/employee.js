var express = require("express")
var router = express.Router()
var db = require("../db")
var bodyParser = require("body-parser")



const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
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
      console.log(req.cookies)
    const { ID, Pass } = req.body
      var sql = `SELECT * FROM employee WHERE IDEmp="${ID}"`
      await db.query(sql, function(err, rows, fields) {
            if (err) {
              res.status(500).send({ defaultAnimationDialog: true })
            }
            console.log(rows[0])
            let userInfo = rows[0]
            if (ID && Pass) {
              // console.log("-----",userInfo)
              if (!userInfo) {
                console.log("1")
       
                res.status(401).json({ defaultAnimationDialog: true })
                return
              }
              if (userInfo.Password === Pass) {
                console.log("2")
                if(userInfo.Position == "Admin"){
                  // from now on we'll identify the user by the id and the id is the 
                  // only personalized value that goes into our token
                  let payload = { ID : userInfo.IDEmp }
                  let token = jwt.sign(payload, jwtOptions.secretOrKey)
                  return res.cookie(`access_token`, `Bearer ${token}`,{
                    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                  , httpOnly: true}).send({ 
                    // token: token,
                     user : userInfo.NameEmp,KKS1 :userInfo.KKS1_factory})
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
    router.get('/clear_cookie', function(req, res){
      res.clearCookie('access_token');
      res.send('cookie access_token cleared');
   });
/* GET users listing. */
// router.post("/", function(req, res, next) {
//   console.log(req.body)
//   //  console.log("-------------------------------------------------------")
//   //  console.log(req.body)
//   console.log(req.body.ID)
//   console.log(req.body.Pass)
//   //  console.log(req.body.Date_Withdraw)
//   //  var sql = `INSERT INTO withdraw(IDEmp,KKS4_Equip_Withdraw,Count_withdraw,Date_Withdraw) VALUES('1379900073717', 'AA',' 1','2020-02-07')`
//   var sql = `SELECT IDEmp,Position,KKS1_factory FROM employee WHERE IDEmp="${req.body.ID}" AND Password="${req.body.Pass}"`
//   db.query(sql, function(err, rows, fields) {
//     if (err) {
//       res.status(500).send({
//         err: console.error()
//       })
//     }
//     // console.log(rows, fields)
//     console.log(rows[0].IDEmp)
//     res.send(rows[0])
//   })
// })

module.exports = router
