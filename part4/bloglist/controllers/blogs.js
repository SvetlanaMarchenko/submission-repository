const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.likes || typeof body.likes === 'undefined') {
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
});


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// Обновление блога
blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const updatedBlog_likes = request.body.likes;
  

  try {
    // Найдите блог по id и обновите его
    const updatedBlogResult = await Blog.findByIdAndUpdate(id, {likes: updatedBlog_likes}, {
      new: true, // Этот параметр возвращает обновленный блог в ответе
    });

    if (!updatedBlogResult) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    response.json(updatedBlogResult);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
})
module.exports = blogsRouter
