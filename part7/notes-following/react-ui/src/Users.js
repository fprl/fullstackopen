import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import noteService from './services/notes'

import Navbar from './components/Navbar'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

const Users = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
      <ul>
        <li>Matti Luukkainen</li>
        <li>Juha Tauriainen</li>
        <li>Arto Hellas</li>
      </ul>
    </div>
  )
}

export default Users
