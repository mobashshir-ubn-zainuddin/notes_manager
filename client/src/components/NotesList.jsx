import NoteCard from "./NoteCard"
import "../styles/components.css"

const NotesList = ({ notes, onNoteDeleted, onNoteUpdated, token }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No notes yet</h3>
        <p>Create your first note to get started!</p>
      </div> 
    )
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onNoteDeleted={onNoteDeleted} onNoteUpdated={onNoteUpdated} token={token} />
      ))} 
    </div>
  )
}

export default NotesList
