const initializeDB = require('../models')
const notesModel = initializeDB.notes
const { StatusCodes } = require('http-status-codes')


const getNotes = async (req, res) => {
   try {
      const user = res.locals.user
      const note = await notesModel.findAll({ where: { createdBy: user.id}, order: [['id', 'DESC']] })
      res.render('index', {notes: note, username: user.username })
   }
   catch(error) {
      console.log(error)
   }
}   

const createNote = async (req, res) => {
   try {
      const user = res.locals.user
      const noteText = req.body.note
      await notesModel.create({ note: noteText, createdBy: user.id })
      await res.status(StatusCodes.CREATED).redirect('/notes')
   }
   catch(error) {
      console.log(error)
   }
}

const updateNote = async (req, res) => {
   try {
      const user = res.locals.user
      const noteId = req.params.id
      const noteText = req.body.note
      const note = await notesModel.findOne({ where: { id: noteId, createdBy: user.id } })
      if (note) {
         await note.update({ note: noteText })  
         res.status(StatusCodes.OK).redirect('/notes')
      } else {
         res.status(StatusCodes.NOT_FOUND)
         throw new console.error("No job found");
      }                 
   } catch (error) {
      console.log(error)
   }
}   

const deleteNote = async (req, res) => {
   try {
      const user = res.locals.user
      const noteId = req.params.id
      const note = await notesModel.findOne({ where: { id: noteId, createdBy: user.id } })
      if (note) {
         await note.destroy()
         res.status(StatusCodes.OK).redirect('/notes')
      } else {
         res.status(StatusCodes.NOT_FOUND)
         throw new console.error(`No job found with id ${ noteId }`);
      }                 
   } catch (error) {
      console.log(error)
   }
}

module.exports = { getNotes, createNote, updateNote, deleteNote }