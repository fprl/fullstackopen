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

  return (
    <div>
      {user === null &&
        <>
          <h2>blogs</h2>
          <LoginForm setUser={setUser}/>
        </>
      }

      {user &&
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <Blogs blogs={blogs}/>
        </>
      }
    </div>
  )
}

export default App
