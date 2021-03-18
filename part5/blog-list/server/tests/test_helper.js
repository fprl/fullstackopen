const Blog = require('../models/blog')
const User = require('../models/user')

const newBlog = {
  title: 'This is my second post within a test',
  author: 'Bianca',
  url: 'https://bianca.com',
  likes: 10
}

const newBlogIncomplete = {
  author: 'Bianca',
  likes: 10
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const userInDb = async (id) => {
  const user = await User
    .findById(id)
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  
  return user.toJSON()
}

module.exports = { newBlog, blogsInDb, userInDb }
