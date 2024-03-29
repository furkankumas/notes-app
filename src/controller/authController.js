require('dotenv').config()
const initializeDB = require('../models')
const userModel = initializeDB.users
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
   return jwt.sign({ id }, process.env.SECRET, {     
      expiresIn: maxAge
   })
}
 
const auth = async (req, res) => {
   try {
      res.render('auth')
   } catch (error) {
      console.log(error)
   }
}

const logout = async (req, res) => {
   await res.cookie('jwt', '', { maxAge: 1 })
   res.redirect('/')
   console.log('kullanıcı çıkış yaptı\n---')
}


const signup = async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await userModel.create({ username: username, password: password })
      const token = createToken(user.id)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.redirect('/notes')
   }
   catch(error) {
      if ((error.message).startsWith('Validation error: ')) {
         console.log(error.message)
         res.redirect('/?error=validationError')
      }
   }
}


const login = async (req, res) => {
   try {
   const { username, password } = req.body
      const user = await userModel.findOne({where: {username: username}})
      if (user) {
         const auth = await bcrypt.compare(password, user.password)
         if (auth) {
            const token = createToken(user.id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.redirect('/notes')
         }
      }
      else {
         console.log('Wrong credentials, Try again.')
         res.redirect('/?error=loginError')
      }
   }
   catch(error) {
      console.log(error)
   }
}


module.exports = { auth, logout, signup, login }