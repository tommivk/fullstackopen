const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/blogs', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs.map((blog => blog.toJSON())))

  })
  
  blogsRouter.post('/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter
