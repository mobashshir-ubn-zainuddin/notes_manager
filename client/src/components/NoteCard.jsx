"use client"

import { useState } from "react"
import "../styles/components.css"

const NoteCard = ({ note, onNoteDeleted, onNoteUpdated, token }) => {
  const [deleting, setDeleting] = useState(false)  
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)
  const [editDescription, setEditDescription] = useState(note.description)
  const [error, setError] = useState("")
  const [updating, setUpdating] = useState(false)

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return
    }

    setDeleting(true)
    setError("")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${note._id}`, {
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

  const handleEdit = () => {
    setEditing(true)
    setEditTitle(note.title)
    setEditDescription(note.description)
    setError("")
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setEditTitle(note.title)
    setEditDescription(note.description)
    setError("")
  }

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    
    if (!editTitle.trim() || !editDescription.trim()) {
      setError("Title and description are required.")
      return
    }

    if (editTitle === note.title && editDescription === note.description) {
      setEditing(false)
      return
    }

    setUpdating(true)
    setError("")

    try {
      // Guard: ensure we have a valid token
      if (!token) {
        setError("Authentication required. Please log in again.")
        return
      }

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/notes/${note._id}`
      console.log('Making PUT request to:', apiUrl)
      console.log('Request body:', { title: editTitle, description: editDescription })
      console.log('Token:', token)
      
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      
      const responseText = await response.text()
      console.log('Response text:', responseText)
      
      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError)
        setError(`Server returned invalid JSON: ${responseText}`)
        return
      }

      if (!response.ok) {
        setError(data.message || "Failed to update note")
        return
      }

      onNoteUpdated(data.note)
      setEditing(false)
    } catch (err) {
      setError("An error occurred")
      console.error(err)
    } finally {
      setUpdating(false)
    }
  }

  const formatDateTime = (date) => {
    const d = new Date(date)
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="note-card">
      {editing ? (
        <form className="edit-form" onSubmit={handleSaveEdit}>
          <div className="form-group">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Note title"
              disabled={updating}
              className="edit-input"
            />
          </div>
          
          <div className="form-group">
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Note description"
              rows="4"
              disabled={updating}
              className="edit-textarea"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="edit-actions">
            <button type="submit" className="btn btn-save" disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={handleCancelEdit} className="btn btn-cancel" disabled={updating}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <span className="note-date">Last saved: {formatDateTime(note.updatedAt || note.createdAt)}</span>
          </div>

          <p className="note-description">{note.description}</p>

          {error && <div className="error-message">{error}</div>}

          <div className="note-actions">
            <button onClick={handleEdit} className="btn btn-edit" disabled={deleting}>
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-delete" disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  )  
}

export default NoteCard
