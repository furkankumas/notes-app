//
require('dotenv').config()
const express = require('express')
const app = express()
const initializeDB = require('./src/models')
const cookieParser = require('cookie-parser')
const checkUser = require('./src/middleware/authentication.js')


//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())


//VIEW ENGINE
app.set('view engine', 'ejs')


//ROUTES
const authRouter =  require('./src/routes/authRouter.js')
const notesRouter =  require('./src/routes/notesRouter.js')

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
    next()
})
app.use('/', authRouter)
app.use('/notes', checkUser , notesRouter)
app.use('/about', (req, res) => {
    res.status(200).render('about')
})
app.use((req, res) => {
    res.status(404).render('404')
})


//START
const port = process.env.PORT || 3000
const start = async() => {
    try {
        initializeDB.sequelize.sync().then((req) => {
            app.listen(port, () => {
                console.log(`Server is listening on ${port}...`)
            })
        })
    }
    catch(error) {
        console.log(error)
    }
}

start()