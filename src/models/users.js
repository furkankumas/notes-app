const { DataTypes } = require('sequelize')
const initializeDB = require('../../db.js')
const bcrypt = require('bcrypt')

const userModel = initializeDB.define(
   "users",
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4, // Dökümandan bakıp ekledim satırı, yoksa id girmedin diye error veriyordu.
         primaryKey: true,
      },
      username: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
         validate: {
            len: { args: [5, 12], msg: "You must use a username with lengths between 5 and 12!"}, 
            isLowercase: { msg: 'You must use a lowercase username!' }
         },
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false, 
         validate: {
            len: { args: [6, 15], msg: "You must use a password with lengths between 6 and 15!" },
         },
      },
   },
   {
      timestamps: true
   },
)

userModel.addHook('beforeSave', async (user) => {
   console.log('hashing password of upcoming newcomer: ', user.username)
   const salt = await bcrypt.genSalt()
   user.password = await bcrypt.hash(user.password, salt)
})
 

module.exports = userModel