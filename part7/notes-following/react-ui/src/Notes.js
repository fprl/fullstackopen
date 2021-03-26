import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import useFetch from './hooks/useFetch'

import Notification from './components/Notification'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const Notes = ({ user }) => {
  const [newRequest, setNewRequest] = useState(new Date())
  const [showAll, setShowAll] = useState(true)
  const { response: notes, isLoading, error } = useFetch({ url: 'api/notes', timeOut: 500 })

  const noteFormRef = useRef()
  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm setNewRequest={setNewRequest} noteFormRef={noteFormRef} />
    </Togglable>
  )

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={error} />
      {<h3>{newRequest.toString()}</h3>}
      {isLoading && <h3>Loading notes...</h3>}

      {notes &&
      <>
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
      </>
      }
    </div>
  )
}

export default Notes
