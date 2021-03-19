import React, { useState, useEffect } from 'react'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { blogService } from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <LoginForm setUser={setUser} />
      </div>
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

      <Blogs blogs={blogs}/>
    </div>
  )
}

export default App
