import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import noteService from './services/notes'

import Home from './Home'
import Login from './Login'
import Notes from './Notes'
import Note from './Note'
import Users from './Users'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      <Navbar >
        <Link to={'/'}>home</Link>
        <Link to={'/notes'}>notes</Link>
        <Link to={'/users'}>users</Link>
      </Navbar>

      <Switch>
        <Route path='/notes/:id' exact component={Note} />
        <Route path='/notes' exact>
          <Notes user={user} />
        </Route>
        <Route path='/users' exact>
          {user ? <Users /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login' exact>
          <Login setUser={setUser} />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}

export default App
