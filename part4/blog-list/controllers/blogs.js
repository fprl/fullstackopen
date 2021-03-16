const blogRouter = require('express').Router()
const note = require('../../notes-following/models/note')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title && !body.url) {
    response.status(400).end()
    return
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedNote = await blog.save()
  console.log(savedNote)
  
  response.status(201)
  response.json(savedNote)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
