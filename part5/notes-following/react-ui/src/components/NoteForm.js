import React, { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ setNewRequest, noteFormRef }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = async (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    try {
      await noteService
        .create(noteObject)
    } catch (error) {
      console.log(error.response.data.error)
    }
    noteFormRef.current.toggleVisibility()
    setNewNote('')
    setNewRequest(new Date())
  }

  return (
    <div className='formDiv'>
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
