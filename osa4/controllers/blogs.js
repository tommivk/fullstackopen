const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

  blogsRouter.get('/blogs', async (request, response) => {
    
    const blogs = await Blog.find({})
    response.json(blogs.map((blog => blog.toJSON())))

  })
  
  blogsRouter.post('/blogs', async (request, response) => {
    const blog = new Blog(request.body)

    if(!blog.likes){
      blog.likes = 0
    }
  
    const savedBlog = await blog.save()
    
    response.status(201).json(savedBlog.toJSON())
      
  })

  module.exports = blogsRouter
