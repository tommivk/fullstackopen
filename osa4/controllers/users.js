const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.username && !body.password) {
    return response
      .status(400)
      .send({ error: 'username and password is required' })
  }
  if (!body.username) {
    return response.status(400).send({ error: 'username is required' })
  }
  if (!body.password) {
    return response.status(400).send({ error: 'password is required' })
  }
  if (body.password.length < 3) {
    return response
      .status(400)
      .send({ error: 'password must be at least 3 characters long' })
  }
  if (body.username.length < 3) {
    return response
      .status(400)
      .send({ error: 'username must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name,
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  })
  response.json(users.map((user) => user.toJSON()))
})
usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  })
  response.json(user.toJSON())
})

module.exports = usersRouter
