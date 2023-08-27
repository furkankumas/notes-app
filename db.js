require('dotenv').config()
const { Sequelize } = require('sequelize')

const initializeDB = new Sequelize(process.env.DB_CONNECTION_STRING, {logging: false})
initializeDB.sync()   //Olmayan table'ları başta kendisi oluştursun diye


module.exports = initializeDB