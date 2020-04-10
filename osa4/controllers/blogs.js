const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/blogs', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  if (!body.url && !body.title) {
    return response.status(400).json('URL and title is required')
  }

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  const newBlogs = user.blogs.filter((x) => !x.equals(blog.id))

  const newUser = {
    _id: decodedToken.id,
    username: user.username,
    name: user.name,
    blogs: newBlogs,
  }

  if (!decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    await User.findByIdAndUpdate(decodedToken.id, newUser)
    return response.status(204).end()
  }
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Not authorized' })
  }
})

blogsRouter.put('/blogs/:id', async (request, response) => {
  const body = await request.body

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
  }

  const update = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  })
  response.json(update.toJSON())
})

blogsRouter.post('/blogs/:id/comments', async (request, response) => {
  const body = request.body

  const blog = await Blog.findById(request.params.id)
  const newComment = new Comment({
    content: body.content,
    blog: blog._id,
  })

  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment.toJSON())
})

module.exports = blogsRouter
