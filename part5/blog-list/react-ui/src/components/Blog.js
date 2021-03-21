import React, { useState } from 'react'
import { blogService } from '../services/blogs'

export const Blog = ({ blog, user, setNewRequest }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = visible ? '' : 'none'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = async () => {
    const updatedBlog = {
      likes: likes + 1
    }

    try {
      await blogService
        .updateLikes(blog.id, updatedBlog)
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveBlog = async (id) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    console.log(result)
    if (result) {
      try {
        await blogService
          .removeBlog(id)
      } catch (error) {
        console.log(error)
      }
      setNewRequest()
    }
  }

  return(
    <article className='blog-info'>
      <p>{blog.title} by {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></p>
      <div className={showWhenVisible}>
        <p>{blog.url}</p>
        <p className='likes-counter' >likes: {likes} <button className='click' onClick={handleLikes}>like</button></p>
        <p>{blog.user.username}</p>
        {user.username === blog.user.username
          ? <button onClick={() => handleRemoveBlog(blog.id)}>remove</button>
          : null
        }
      </div>
    </article>
  )
}
