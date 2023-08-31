const userModel = require('../models/users')

const errorHandler = (err) => {
   console.log(err.message)            // DAHA DETAYLI VALIDATION ERROR HANDLING VS. YAPILABİLİR.
}


const auth = async (req, res) => {
   res.render('auth')
}

const logout = async (req, res) => {
   res.render('auth')
}

const signup = async (req, res) => {
   try {
      const { username, password } = req.body
      await userModel.create({ username: username, password: password })
      res.redirect('/')
   }
   catch(ValidationErrorItem) {
      errorHandler(ValidationErrorItem)
      res.status(400).send('error, user not created')
   }
}

const login = async (req, res) => {
   try {
      const { username, password } = req.body
      const user = await userModel.findOne({ where: {username: username, password: password} })
      if (user) {
         //login
         console.log('Welcome, ', username)
      }
      else {
         console.log('Wrong credentials, Try again.')
      }
      res.redirect('/')
   }
   catch(ValidationErrorItem) {
      const errors = errorHandler(ValidationErrorItem)
      res.status(400).send(errors)
   }
}


module.exports = { auth, logout, signup, login }