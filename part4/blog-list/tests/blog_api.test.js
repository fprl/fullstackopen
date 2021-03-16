// run tests in this file with:         npm test -- tests/blog_api.test.js
//     specific test/describe block:    npm test -- -t 'a specific note is within the returned notes'
//     all test that contains a part:   npm test -- -t 'notes'

const supertest = require('supertest');
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  }
  console.log('done')
})

// tests
test('returns the correct amount of blogposts in JSON', async () => {
  console.log('entered test')
  const notes = await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)

  expect(notes.body).toHaveLength(helper.initialBlogs.length)
})

test('there is a id unique identifier', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test('a note is correctly created', async () => {
const newBlog = {
    title: 'CSS is hard',
    author: 'Bianca',
    url: 'https://bianca.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const notesAtEnd = await helper.blogsInDb()
  const createdBlog = notesAtEnd[notesAtEnd.length - 1]
  delete createdBlog.id

  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(createdBlog).toEqual(newBlog)
})

test.only('if likes is missing, set to 0', async () => {
  const newBlog = {
    title: 'CSS is hard',
    author: 'Bianca',
    url: 'https://bianca.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const notesAtEnd = await helper.blogsInDb()
  const createdBlog = notesAtEnd[notesAtEnd.length - 1]
  
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(createdBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})
