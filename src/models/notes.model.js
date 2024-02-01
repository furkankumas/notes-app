module.exports = (sequelize, DataTypes) => {
const notes = sequelize.define(
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

return notes
}