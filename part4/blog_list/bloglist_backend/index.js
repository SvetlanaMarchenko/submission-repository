const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Bloglist = require('./models/bloglist')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('frontend-dist'))


app.get('/api/bloglist', (request, response) => {
  Bloglist.find({}).then(bloglists => {
    response.json(bloglists)
  })
})


app.post('/api/bloglists', (request, response, next) => {
  const body = request.body
  const bloglist = new Bloglist({
    name: body.name,
    number: body.number,
  });

  bloglist.save()
    .then(savedBloglist => {
      response.json(savedBloglist)
    })
    .catch(error => next(error))
})

// const generateId = () => {
//   const maxId = bloglists.length > 0
//     ? Math.max(...bloglists.map(n => n.id))
//     : 0
//   return maxId + 1
// }


app.get('/api/bloglists/:id', (request, response, next) => {
  Bloglist.findById(request.params.id)
    .then(bloglist => {
      if (bloglist) {
        response.json(bloglist)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/bloglists/:id', (request, response, next) => {
  Bloglist.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/bloglists/:id', (request, response, next) => {
  const { name, number } = request.body

  Bloglist.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedBloglist => {
      response.json(updatedBloglist)
    })
    .catch(error => next(error))
})
app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


