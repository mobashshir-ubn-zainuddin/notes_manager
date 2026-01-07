const express = require("express")
const authMiddleware = require("../middleware/auth")
const Note = require("../models/Note")

const router = express.Router()

// GET all notes for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

// CREATE a new note
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body

  // Validation
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." })
  }

  try {
    const note = new Note({
      title,
      description,
      userId: req.userId,
    })

    await note.save()
    res.status(201).json({ message: "Note created successfully.", note })
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

// DELETE a note
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params

  try {
    const note = await Note.findById(id)

    if (!note) {
      return res.status(404).json({ message: "Note not found." })
    }

    // Check if the note belongs to the logged-in user
    if (note.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized to delete this note." })
    }

    await Note.findByIdAndDelete(id)
    res.json({ message: "Note deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

module.exports = router
