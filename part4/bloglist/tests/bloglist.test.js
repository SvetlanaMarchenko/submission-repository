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



test('a valid blog can be added', async () => {
  const newBlog = {
    title: "async/await блог",
    author: "Автор блога async/await",
    url: "https://async/await.com",
    likes: 182
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'async/await блог'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Valid Author",
    url: "https://validurl.com",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})