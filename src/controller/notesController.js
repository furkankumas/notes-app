const notesModel = require('../models/notes.js')
const { StatusCodes } = require('http-status-codes')

const getNotes = async (req, res) => {
   try {
      const notes = await notesModel.findAll()
      res.render('index', {notes: notes})
   }
   catch(error) {
      console.log(error)
   }
}   

const createNote = async (req, res) => {
   try {
      const noteText = req.body
      notesModel.create(noteText)
      .then(res.redirect('/'))
   }
   catch(error) {
      console.log(error)
   }
}

const updateNote = async (req, res) => {
   try {
      const noteId = req.params.id
      const noteText = req.body.note
      console.log(req.body)
      const note = await notesModel.findOne({ where: { id: noteId } })
      if (note) {
         await notesModel.update({ note: noteText }, { where: { id: noteId }})
         .then(res.status(StatusCodes.OK).redirect('/'))
      } else {
         throw new console.error("No job found");
      }                 
   } catch (error) {
      console.log(error)
   }
}   

const deleteNote = async (req, res) => {
   try {
      const noteId = req.params.id
      const note = await notesModel.findOne({ where: { id: noteId } })
      if (note) {
            await notesModel.destroy({ where: { id: noteId } })
            .then(res.status(StatusCodes.OK).redirect('/'))
      } else {
            throw new console.error(`No job found with id ${ noteId }`);
      }                 
   } catch (error) {
      console.log(error)
   }
}

module.exports = { getNotes, createNote, updateNote, deleteNote }