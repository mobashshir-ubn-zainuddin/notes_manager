"use client"

import { useState } from "react"
import "../styles/components.css"

const NoteCard = ({ note, onNoteDeleted, token }) => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return
    }

    setDeleting(true)
    setError("")

    try {
      const response = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to delete note")
      }

      onNoteDeleted(note._id)
    } catch (err) {
      setError("Failed to delete note")
      console.error(err)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>

      <p className="note-description">{note.description}</p>

      {error && <div className="error-message">{error}</div>}

      <button onClick={handleDelete} className="btn btn-delete" disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}

export default NoteCard
