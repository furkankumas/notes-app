require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/users.js')

// check json web token exists & is verified
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt
   if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
         if (err) {
            console.log('token verify error message:', err.message)
            res.locals.user = null
            res.redirect('/').status(400)
         }
         else {
            const user = await userModel.findOne({ where: { id: decodedToken.id } })
            if (user) {
               res.locals.user = user
               console.log('aktif kullanici id"si:', res.locals.user.username)
               next()
            }
         }
      })   
   }
   else {
      res.locals.user = null
      res.redirect('/')
   }
}


module.exports = checkUser