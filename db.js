require('dotenv').config()
const { Sequelize } = require('sequelize')

const initializeDB = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {dialect: 'postgresql', logging: false})
initializeDB.sync()


module.exports = initializeDB