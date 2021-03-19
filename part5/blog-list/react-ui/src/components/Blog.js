import React, { useState } from 'react'
import { blogService } from '../services/blogs'

export const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = visible ? '' : 'none'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = async (id) => {
    const updatedBlog = {
      likes: likes + 1
    }

    try {
      await blogService
        .updateLikes(blog.id, updatedBlog)
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <article className='blog-info'>
      <p>{blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></p>
      <div className={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes: {likes} <button onClick={() => handleLikes(blog.id)}>like</button></p>
        <p>{blog.author}</p>
      </div>
    </article>
  )
}
