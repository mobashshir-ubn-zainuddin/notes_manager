const express = require("express")
const authMiddleware = require("../middleware/auth")
const Note = require("../models/Note")
const mongoose = require("mongoose")

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

// UPDATE a note
router.put("/:id", authMiddleware, async (req, res) => {
  console.log('PUT /api/notes/:id route hit')
  console.log('Request params:', req.params)
  console.log('Request body:', req.body)
  console.log('User ID from token:', req.userId)
  
  const { id } = req.params
  const { title, description } = req.body

  // Validate ObjectId format early
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Invalid note ID format:', id)
    return res.status(400).json({ message: "Invalid note ID." })
  }

  // Validation
  if (!title || !description) {
    console.log('Validation failed: missing title or description')
    return res.status(400).json({ message: "Title and description are required." })
  }

  try {
    const note = await Note.findById(id)
    console.log('Found note:', note)

    if (!note) {
      console.log('Note not found with ID:', id)
      return res.status(404).json({ message: "Note not found." })
    }

    // Check if the note belongs to the logged-in user
    if (note.userId.toString() !== req.userId) {
      console.log('Authorization failed: note userId:', note.userId, 'token userId:', req.userId)
      return res.status(403).json({ message: "Not authorized to update this note." })
    }

    // Update the note
    note.title = title
    note.description = description
    note.updatedAt = Date.now()

    await note.save()
    console.log('Note updated successfully')
    res.json({ message: "Note updated successfully.", note })
  } catch (error) {
    console.error('Error updating note:', error)
    res.status(500).json({ message: "Server error.", error: error.message })
  }
})

// DELETE a note
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params

  // Validate ObjectId format early
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID." })
  }

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
