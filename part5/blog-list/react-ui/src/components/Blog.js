import React, { useState } from 'react'

export const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = visible ? '' : 'none'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <article className='blog-info'>
      <p>{blog.title} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button></p>
      <div className={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
    </article>
  )
}
