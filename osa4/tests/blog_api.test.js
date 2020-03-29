const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

const intialBlogs = [
  {
    title: "blog",
    author: "Alan Turing",
    url: "https://www.randomblogsite.org",
    likes: 43
  },
  {
    title: "another blog",
    author: "Larry Page",
    url: "https://www.google.com",
    likes: 5
  }
]

let token = null

describe("when there is initially some notes saved and user added", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api
      .post("/api/users")
      .send({ name: "testuser", username: "test", password: "pass" })
      .expect(200)

    const user = await User.findOne({ username: "test" })

    let blogObject = new Blog(intialBlogs[0])
    blogObject.user = user._id
    await blogObject.save()
    user.blogs = user.blogs.concat(blogObject)
    await user.save()

    blogObject = new Blog(intialBlogs[1])
    blogObject.user = user._id
    await blogObject.save()
    user.blogs = user.blogs.concat(blogObject)
    await user.save()

    const res = await api
      .post("/api/login")
      .send({ username: "test", password: "pass" })
      .expect(200)
    token = res.body.token
  })

  test("get returns status 200", async () => {
    await api.get("/api/blogs").expect(200)
  })

  test("right amount of blogs are returned", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body.length).toBe(2)
  })

  test("id is returned in the right form", async () => {
    const response = await api.get("/api/blogs")

    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test("new blog is added", async () => {
    const newBlog = {
      title: "new blog",
      author: "Tom Hanks",
      url: "https://www.newblog.com",
      likes: 149
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${token}`)
      .expect(201)

    const notesAtEnd = await api.get("/api/blogs")

    expect(notesAtEnd.body[intialBlogs.length]).toMatchObject(newBlog)
    expect(notesAtEnd.body.length).toBe(intialBlogs.length + 1)
  })

  test("if likes is undefined it defaults to 0", async () => {
    const newBlog = {
      title: "new blog",
      author: "New Author",
      url: "https://www.newblog.com"
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const notesAtEnd = await api.get("/api/blogs")

    expect(notesAtEnd.body[intialBlogs.length].likes).toBe(0)
  })

  test("if title and url is missing response is 400", async () => {
    const newBlog = {
      author: "New Author",
      likes: 44
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test("login works", async () => {
    await api
      .post("/api/login")
      .send({ username: "test", password: "pass" })
      .expect(200)
  })

  test("blog is not added without token", async () => {
    const newBlog = {
      title: "new blog",
      author: "New Author",
      url: "https://www.newblog.com",
      likes: 4
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
  })

  test("blog is not added with malformed token", async () => {
    const newBlog = {
      title: "blog",
      author: "Author",
      url: "https://www.newblog.com",
      likes: 9
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}5Dkd`)
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
