const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async()=> {
    await User.deleteMany({})
})

test('new user is added and data is correct', async () => {
   newUser = {
        name: 'new name',
        username: 'user1',
        password: 'password1'
    }

   const response = await api.post('/api/users')
          .send(newUser)
          .expect(200)
    expect(response.body.username).toEqual(newUser.username)
    expect(response.body.name).toEqual(newUser.name)
    
})

test('user without username is not added', async () => {
    newUser = {
         name: 'new name',
         password: 'password1'
     }
 
    const response = await api.post('/api/users')
           .send(newUser)
           .expect(400)
           
    expect(response.error.text).toEqual(`{\"error\":"username is required\"}`)
    
     
 })

 test('user without password is not added', async () => {
    newUser = {
         name: 'new name',
         username: 'user1'
     }
 
    const response = await api.post('/api/users')
           .send(newUser)
           .expect(400)
    
    expect(response.error.text).toEqual(`{\"error\":"password is required\"}`)
         
 })

 test('user without username and password is not added', async () => {
    newUser = {
        name: 'new name'
    }
 
    const response = await api.post('/api/users')
           .send(newUser)
           .expect(400)
    
  expect(response.error.text).toEqual(`{\"error\":"username and password is required\"}`)
    
 })

 test('user with too short password is not added', async () => {
    newUser = {
        name: 'new name',
        username: 'user1',
        password: 'pa'
    }
 
   const response =  await api.post('/api/users')
           .send(newUser)
           .expect(400)
 expect(response.error.text).toEqual(`{\"error\":"password must be at least 3 characters long\"}`)
 })

 test('user with too short username is not added', async () => {
    newUser = {
        name: 'new name',
        username: 'us',
        password: 'password1'
    }
 
   const response = await api.post('/api/users')
           .send(newUser)
           .expect(400)
           
     expect(response.error.text).toEqual(`{\"error\":"username must be at least 3 characters long\"}`)
   console.log(typeof response.error.text)
 })

 test('user with duplicate username is not added', async () => {
    newUser = {
         name: 'new name2',
         username: 'user2',
         password: 'password1'
     }
     newUser2 = {
        name: 'new name3',
        username: 'user2',
        password: 'password2'
    }
 
    await api.post('/api/users')
           .send(newUser)
    
    
    const response = await api.post('/api/users')
           .send(newUser2)
           .expect(400)
    
     expect(response.error.text).toEqual(`{\"error\":"username aleady exists\"}`)
 })

afterAll(() => {
    mongoose.connection.close()
  })