const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const intialBlogs = [
    {
        title: 'blog',
        author: 'Alan Turing',
        url: 'https://www.randomblogsite.org',
        likes: 43
    },
    {
        title: 'another blog',
        author: 'Larry Page',
        url: 'https://www.google.com',
        likes: 5
    }
]

beforeEach(async()=> {
    await Blog.deleteMany({})
    let blogObject = new Blog(intialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(intialBlogs[1])
    await blogObject.save()

})

test('get returns status 200', async() =>  {

    await api.get('/api/blogs').expect(200)
    
})

test('right amount of blogs are returned', async() => {
   const response = await api.get('/api/blogs')
   expect(response.body.length).toBe(2)
   
})

test('id is returned in the right form', async() => {

    const response = await api.get('/api/blogs')
  
    response.body.forEach(blog=> expect(blog.id).toBeDefined())

})

test('new blog is added', async() => {

    const newBlog = {
        title: 'new blog',
        author: 'Tom Hanks',
        url: 'https://www.newblog.com',
        likes: 149
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const notesAtEnd = await api.get('/api/blogs')

    expect(notesAtEnd.body[intialBlogs.length]).toMatchObject(newBlog)
    expect(notesAtEnd.body.length).toBe(intialBlogs.length + 1)

   
})

test('if likes is undefined it defaults to 0', async() => {

    const newBlog = {
        title: 'new blog',
        author: 'New Author',
        url: 'https://www.newblog.com'
    }

    await api.post('/api/blogs')
          .send(newBlog)
          .expect(201)

    const notesAtEnd = await api.get('/api/blogs')

    expect(notesAtEnd.body[intialBlogs.length].likes).toBe(0)

})

test('if title and url is missing response is 400', async() => {
   
    const newBlog = {
        author: 'New Author',
        likes: 44
    }

    await api.post('/api/blogs')
          .send(newBlog)
          .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
  })