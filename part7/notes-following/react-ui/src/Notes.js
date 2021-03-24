import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import noteService from './services/notes'

import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const Notes = ({ user }) => {
  const [notes, setNotes] = useState([])
  const [newRequest, setNewRequest] = useState(new Date())

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [newRequest])

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm setNewRequest={setNewRequest} noteFormRef={noteFormRef} />
    </Togglable>
  )

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <div>
        {user ? noteForm() : ''}
      </div>

      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`} >{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes
