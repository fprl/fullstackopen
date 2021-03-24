import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import noteService from './services/notes'
import Notification from './components/Notification'

const Note = () => {
  const [note, setNote] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  const { id } = useParams()

  const toggleImportanceOf = (id) => {
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const label = note.important ? 'make not important' : 'make important'

  return (
    <div>
      <h1>Blog - {id}</h1>
{/*       <Notification setErrorMessage={setErrorMessage}/>
      <h2>{note.content}</h2>
      <p>{note.user.username}</p>
      <p>{note.id}</p>
      <p><strong>{note.important ? 'important' : 'not important'}</strong></p>
      <button onClick={() => toggleImportanceOf(id)}>{label}</button> */}
    </div>
  )
}

export default Note
