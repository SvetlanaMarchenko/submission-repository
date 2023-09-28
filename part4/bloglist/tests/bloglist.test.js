const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Заголовок блога ",
    "author": "Автор блога",
    "url": "https://example.com",
    "likes": 10
  },
  {
    "title": "Заголовок блога номер 2",
    "author": "Автор ,блога номер 2",
    "url": "https://example_example.com",
    "likes": 15
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 200000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about Заголовок блога', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Заголовок блога')
})

afterAll(async () => {
  await mongoose.connection.close()
})