const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(body.userId)

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
  const updatedBlog = request.body;

  try {
    // Найдите блог по id и обновите его
    const updatedBlogResult = await Blog.findByIdAndUpdate(id, updatedBlog, {
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
  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updatedBlog => {
  //     response.json(updatedBlog)
  //   })
  //   .catch(error => next(error))


module.exports = blogsRouter
