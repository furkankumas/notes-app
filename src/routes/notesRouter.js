const { Router } = require('express')
const router = Router()
const { getNotes, createNote, updateNote, deleteNote} = require('../controller/notesController')

router.get("/", getNotes)
router.post("/", createNote)
router.post("/:id/update", updateNote)
router.post("/:id/delete", deleteNote)


module.exports = router