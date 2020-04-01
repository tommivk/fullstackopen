import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({author: '', url: '', title: ''})

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user))
      blogService.setToken(user.token)
      
      setUser(user)

      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("error happened")
    }
  }

  const handleNewBLog = async event => {
    event.preventDefault()
   
    try{
    const newBlogObject = {
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url
    }

    await blogService.create(newBlogObject)
    setBlogs(blogs.concat(newBlogObject))
    setNewBlog({...newBlog, author: '', url: '', title: ''})
    }catch(error){
      console.log('adding new blog failed')
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
  const newBlogField = () => (
   <div>
    <h3>add new blog</h3>
    <form onSubmit={handleNewBLog}>
      <div>
        title
      <input
         type ="text"
         name = "title"
         value = {newBlog.title}
         onChange={({target}) => setNewBlog({...newBlog, title: target.value})}
        />
        </div>
        <div>
          author
        <input
         type ="text"
         name = "Author"
         value = {newBlog.author}
         onChange={({target}) => setNewBlog({...newBlog, author: target.value})}
        />
        </div>
        <div>
          url
        <input
         type ="text"
         name = "url"
         value = {newBlog.url}
         onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
        />
        
      </div>
      <div>
        <button type = "submit">Add new blog</button>
      </div>
    </form>
    <br></br>
    
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
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  if(user===null){
    return (
      <div>
        <h2>log in to application</h2>
        {loginForm()}
        
      </div>
    )
  }
    return (
      <div>
      <h2>blogs</h2>
      {loggedIn(user)}
      {newBlogField()}
      {allBlogs()}
      </div>
    )
  
  
}

export default App
