const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog(body)

  const savedNote = await blog.save()
  console.log(savedNote)
  
  response.status(201)
  response.json(savedNote)
})

module.exports = blogRouter
