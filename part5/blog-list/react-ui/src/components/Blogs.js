import React from 'react'
import { Blog } from './Blog'

export const Blogs = ( {blogs }) => (
  <div>
  {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)
