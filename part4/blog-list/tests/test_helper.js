const Note = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Anna',
    url: 'https://web.com',
    likes: 15
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Maximilian',
    url: 'https://someotherweb.com',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
