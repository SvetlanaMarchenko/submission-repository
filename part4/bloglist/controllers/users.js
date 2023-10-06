const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// usersRouter.post('/', async (request, response) => {
//   const { username, password } = request.body

//   if (!username || username.length < 3) {
//     return response.status(400).json({ error: 'Username must be at least 3 characters long' });
//   }

//   if (!password || password.length < 3) {
//     return response.status(400).json({ error: 'Password must be at least 3 characters long' });
//   }

//   // Check for username uniqueness (you can use a helper function)
//   const existingUser = await User.findOne({ username })
//   if (existingUser) {
//     return response.status(400).json({ error: 'Username must be unique' })
//   }

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users)
})

module.exports = usersRouter