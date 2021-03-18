// run tests in this file with:         npm test -- tests/blog_api.test.js
//     specific test/describe block:    npm test -- -t 'a specific note is within the returned notes'
//     all test that contains a part:   npm test -- -t 'notes'

const supertest = require('supertest');
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog');
const User = require('../models/user')

/* beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  }
  console.log('done')
}) */

let globalResponse;

beforeEach(async () => {
  const userToLogIn = {
    username: "Hellas",
    password: "secretpassword"
  }

  const login = await api
    .post('/api/login')
    .send(userToLogIn)
    .expect(200)

  return globalResponse = login.body
})

// tests
describe('when there is initially some notes saved', () => {
  test('returns the correct amount of blogposts in JSON', async () => {
    console.log('entered test')
    const notes = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  
    expect(notes.body).toHaveLength(2)
  })
  
  test('there is a id unique identifier', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
  
    expect(blog.id).toBeDefined()
  })
})

describe('login of a user', () => {
  test('a user is logged in and receive a token', async() => {
    const userToLogIn = {
      username: "Hellas",
      password: "secretpassword"
    }

    const login = await api
      .post('/api/login')
      .send(userToLogIn)
      .expect(200)

    expect(login.body).toHaveProperty('token')
  })
})

describe('addition of a new note', () => {
  test('a note is correctly created', async () => {
  const blogsAtBegin = await helper.blogsInDb()
  const newBlog = helper.newBlog 
  const token = globalResponse.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
  
    const blogsAtEnd = await helper.blogsInDb()
    const createdBlog = blogsAtEnd[blogsAtEnd.length - 1]
    delete createdBlog.id
    delete createdBlog.user
  
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length + 1)
    expect(createdBlog).toEqual(newBlog)
  })

  test('a note is not created if token is missing', async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtBegin.length)
    })
  
  test('if likes is missing, set to 0', async () => {
    const blogsAtBegin = await helper.blogsInDb()
    const newBlog = helper.newBlog
    delete newBlog.likes
    const token = globalResponse.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
  
    const blogsAtEnd = await helper.blogsInDb()
    const createdBlog = blogsAtEnd[blogsAtEnd.length - 1]
  
    expect(blogsAtEnd).toHaveLength(blogsAtBegin.length + 1)
    expect(createdBlog.likes).toBe(0)
  })
  
  test('if title and url are missing, expect 400 bad request', async () => {
    const newBlog = helper.newBlogIncompelte
    const token = globalResponse.token

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id and token is valid', async () => {
    const userAtBeggining = await helper.userInDb('6051f500dc36f4163c9a8288')
    const initialBlogsOfUser = userAtBeggining.blogs
    const blogToDelete = initialBlogsOfUser[1]

    const token = globalResponse.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    
    const userAtEnd = await helper.userInDb('6051f500dc36f4163c9a8288')
    const finalBlogsOfUser = userAtEnd.blogs

    expect(finalBlogsOfUser).toHaveLength(initialBlogsOfUser.length - 1)
  })

  test('fails with status code 401 if token is not correct or provided', async () => {
    const userAtBeggining = await helper.userInDb('6051f500dc36f4163c9a8288')
    const initialBlogsOfUser = userAtBeggining.blogs
    const blogToDelete = initialBlogsOfUser[1]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
    
    const userAtEnd = await helper.userInDb('6051f500dc36f4163c9a8288')
    const finalBlogsOfUser = userAtEnd.blogs

    expect(finalBlogsOfUser).toHaveLength(initialBlogsOfUser.length)
  })
})

describe('update of a note', () => {
  test('an update is correctly made', async () => {
    const blogsAtFirst = await helper.blogsInDb()
    const noteToUpdate = blogsAtFirst[0]

    const newBlogLikes = {
      likes: 15
    }

    await api
      .put(`/api/blogs/${noteToUpdate.id}`)
      .send(newBlogLikes)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toEqual(newBlogLikes.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
