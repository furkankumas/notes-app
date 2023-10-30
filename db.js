require('dotenv').config()
const { Sequelize } = require('sequelize')

const initializeDB = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {host: process.env.POSTGRES_HOST, port: '5432', dialect: 'postgresql', logging: false})
initializeDB.sync()


module.exports = initializeDB