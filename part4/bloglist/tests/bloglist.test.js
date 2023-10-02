const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../tests/test_helper');

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

test('default likes value is 0 when not provided', async () => {
  const newBlogWithoutLikes = {
    title: "Blog without likes",
    author: "Author without likes",
    url: "https://example.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const createdBlog = response.body
  expect(createdBlog.likes).toBeDefined()
  expect(createdBlog.likes).toBe(0)
})


test('added a new blog', async () => {
  const newBlog = {
      "title": "added a new blog",
      "author": "added a new blog",
      "url": "https://added_a_new_blog.com",
      "likes": 200
    }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'added a new blog'
  )
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 and updated likes count', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedLikes = blogToUpdate.likes + 1

    const updatedBlog = { likes: updatedLikes }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(updatedBlogInDb.likes).toBe(updatedLikes)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
