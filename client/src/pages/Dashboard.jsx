"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NoteForm from "../components/NoteForm"
import NotesList from "../components/NotesList"
import "../styles/dashboard.css"

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    fetchNotes()
  }, [token, navigate])

  const fetchNotes = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/login")
          return
        }
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json()
      setNotes(data)
    } catch (err) {
      setError(err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNoteAdded = (newNote) => {
    setNotes([newNote, ...notes])
  }

  const handleNoteDeleted = (noteId) => {
    setNotes(notes.filter((note) => note._id !== noteId))
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>My Notes</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.email}</span>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="notes-section">
          <NoteForm onNoteAdded={handleNoteAdded} token={token} />

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading your notes...</div>
          ) : (
            <NotesList notes={notes} onNoteDeleted={handleNoteDeleted} token={token} />
          )}
        </section>
      </main>
    </div>
  )
}

export default Dashboard
