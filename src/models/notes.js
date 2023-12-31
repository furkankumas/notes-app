const { DataTypes } = require('sequelize')
const initializeDB = require('../../db.js')

const notesModel = initializeDB.define(
   "notes",
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         unique: true,
      },
      note: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [1, 150],
         },
      },
      createdBy: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      timestamps: true
   },
)

module.exports = notesModel