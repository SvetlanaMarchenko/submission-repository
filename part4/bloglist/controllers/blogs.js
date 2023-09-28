const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Note.find({})
  response.json(blogs)
})


blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter