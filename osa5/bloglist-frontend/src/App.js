import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))

      setUser(user)

      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error happened")
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="off"
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )

  const allBlogs = () => (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }
  const loggedIn = user => (
    <div>
      {user.name} logged in <button onClick={logOut}>logout</button>
      <br />
      <br />
    </div>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //setToken
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      {user === null && <h2>log in to application</h2>}
      {user !== null && <h2>blogs</h2>}

      {user === null && loginForm()}
      {user !== null && loggedIn(user)}
      {user !== null && allBlogs()}
    </div>
  )
}

export default App
