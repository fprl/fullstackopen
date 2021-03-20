import React, { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ setNewRequest, noteFormRef }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        noteFormRef.current.toggleVisibility()
        setNewNote('')
        setNewRequest(new Date())
      })
      .catch(error => console.log(error.response.data.error))
  }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
