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

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
