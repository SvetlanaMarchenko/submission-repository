const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: "Заголовок блога",
    author: "Автор блога",
    url: "https://example.com",
    likes: 10
  },
  {
    title: "Заголовок блога номер 2",
    author: "Автор ,блога номер 2",
    url: "https://example_example.com",
    likes: 15
  }
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
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Заголовок блога номер 2'
  )
})

test('blogs have an id', async () => {
  const response = await api.get('/api/blogs')
  
  const blogs = response.body
  expect(blogs).toBeDefined()

  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
