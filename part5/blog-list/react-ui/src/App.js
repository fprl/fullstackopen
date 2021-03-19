import React, { useState, useEffect } from 'react'

import { blogService } from './services/blogs'

import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { AddBlogForm } from './components/AddBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newRequest, setNewRequest] = useState(new Date())

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [newRequest])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <h2>blogs</h2>
        <LoginForm setUser={setUser} />
      </>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in 
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        }}>logout</button></p>

      <h2>create new</h2>
      <AddBlogForm setNewRequest={setNewRequest} />

      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App
