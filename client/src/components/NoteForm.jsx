"use client"

import { useState } from "react"
import "../styles/components.css"

const NoteForm = ({ onNoteAdded, token }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to create note")
        return
      }

      onNoteAdded(data.note)
      setTitle("")
      setDescription("")
    } catch (err) {
      setError("An error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Create a New Note</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Note Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your note here..."
          rows="5"
          disabled={loading}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Note"}
      </button>
    </form>
  )
}  

export default NoteForm
