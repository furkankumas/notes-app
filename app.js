//
require('dotenv').config()
const express = require('express')
const app = express()
const initializeDB = require('./db')
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


// ROUTES
const authRouter =  require('./src/routes/authRouter.js')
const notesRouter =  require('./src/routes/notesRouter.js')

app.use('/auth', authRouter)
app.use('/', notesRouter)
app.use((req, res) => {
    res.status(404).render('404')
})


// START
const port = process.env.PORT || 3000
const start = async() => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port} ...`))
        initializeDB
        console.log('DB connected.')
    }
    catch(error) {
        console.log(error)
    }
};

start()