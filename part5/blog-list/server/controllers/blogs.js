const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')

const { userExtractor } = middleware
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1})

  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog
  .findById(request.params.id)
  .populate('user', { username: 1, name: 1, id: 1})

  response.json(blog)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if (!body.title && !body.url) {
    response.status(400).end()
    return
  }

  const user = request.user

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201)
  response.json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'invalid token' })
  }

})

blogRouter.put('/:id', async (request, response) => {
  const user = request.user
  const body = request.body

  const blog = {
    likes: body.likes,
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log(updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogRouter
