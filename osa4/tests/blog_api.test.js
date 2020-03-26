const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('get returns status 200', async() =>  {

    await api.get('/api/blogs').expect(200)
    
})

test('right amount of blogs are returned', async() => {
   const response = await api.get('/api/blogs')
   expect(response.body.length).toBe(4)
   
})

afterAll(() => {
    mongoose.connection.close()
  })