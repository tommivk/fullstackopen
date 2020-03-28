const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


  blogsRouter.get('/blogs', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map((blog => blog.toJSON())))

  })
  
  blogsRouter.post('/blogs', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    
 
    const decodedToken = jwt.verify(token, process.env.SECRET)
    

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    
    if(!body.url && !body.title){
      return response.status(400).json('URL and title is required')
    }

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog.toJSON())
      
  })

  blogsRouter.delete('/blogs/:id', async (request, response) => {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/blogs/:id', async (request, response) => {
    const body = await request.body

    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const update = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})
    response.json(update.toJSON())
    
  })


  module.exports = blogsRouter
