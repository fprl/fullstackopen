import React, { useState, useEffect, useRef } from 'react'
import { blogService } from './services/blogs'

import { Togglable } from './components/Togglable'
import { LoginForm } from './components/LoginForm'
import { Blogs } from './components/Blogs'
import { Blog } from './components/Blog'
import { AddBlogForm } from './components/AddBlogForm'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newRequest, setNewRequest] = useState(new Date())
  const [notification, setNotification] = useState({ text: null, action: null })

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

  const handleNotification = (action, message) => {
    const newNotification = {text: message, action};
    setNotification({...notification, ...newNotification})

    const clearNotification = {text: null, action: null}
    setTimeout(() => setNotification({...notification, ...clearNotification}), 5000);
  }

  const addBlogFormRef = useRef()

  if (user === null) {
    return (
      <>
        <h2>log in to application</h2>

        <Notification notification={notification}/>

        <LoginForm setUser={setUser} handleNotification={handleNotification} />
      </>
    )
  }
  
  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification}/>

      <p>{user.name} logged in 
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        handleNotification('error', `${user.name} successful logged out`)
        setUser(null)
      }}>logout</button></p>

      <Togglable buttonLabel={'create new blog'} ref={addBlogFormRef}>
        <h2>create new</h2>
        <AddBlogForm setNewRequest={setNewRequest} handleNotification={handleNotification} addBlogFormRef={addBlogFormRef}/>
      </Togglable>

      <Blogs>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} user={user} setNewRequest={setNewRequest} />)}
      </Blogs>
    </div>
  )
}

export default App
