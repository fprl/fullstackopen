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

test.only('there is a id unique identifier', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})