import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'
import NewBlogField from './components/NewBlogField'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)

      setUsername('')
      setPassword('')
      showMessage(`logged in as ${user.username}`)
    } catch (exception) {
      showError('Wrong username or password')
    }
  }

  const showMessage = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 6000)
  }
  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(''), 6000)
  }

  const createNewBLog = async (newBlog) => {
    try {
      const newBlogObject = {
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
        likes: 0,
      }

      const response = await blogService.create(newBlogObject)
      newBlogObject.id = response.id

      newBlogObject.user = {
        name: user.name,
        id: user.id,
        username: user.username,
      }

      setBlogs(blogs.concat(newBlogObject))
      showMessage(
        `new blog ${newBlogObject.title} by ${newBlogObject.author} added!`
      )
    } catch (error) {
      showError('adding new blog failed')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          autoComplete='off'
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  )

  const handleNewLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)

      response.user = {
        id: response.user,
        name: blog.user.name,
        username: blog.user.name,
      }
      const filterBlog = blogs.filter((x) => x.id !== response.id)
      const allBlogs = filterBlog.concat(response)
      setBlogs(allBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)))
    } catch (error) {
      console.log('like failed')
    }
  }

  const handleBlogRemove = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id)
        const filteredBlogs = blogs.filter((x) => x.id !== blog.id)
        setBlogs(filteredBlogs)
      } catch (error) {
        console.log('failed to remove blog')
      }
    }
  }

  const allBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            handleNewLike={handleNewLike}
            handleBlogRemove={handleBlogRemove}
          />
        ))}
      </div>
    )
  }

  const logOut = () => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      showMessage('logged out successfully')
    } catch (error) {
      showError('Something went wrong')
    }
  }
  const loggedIn = (user) => (
    <div>
      {user.name} logged in <button onClick={logOut}>logout</button>
      <br />
      <br />
    </div>
  )

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  if (user === null) {
    return (
      <div>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <ErrorMessage message={errorMessage} />
      <Notification message={notification} />
      <h2>blogs</h2>
      {loggedIn(user)}
      <Togglable buttonLabel='New Blog'>
        <NewBlogField createNewBlog={createNewBLog} />
      </Togglable>
      <br></br>
      {allBlogs()}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  const errorStyle = {
    padding: '10px',
    border: 'solid red 2px',
    color: 'red',
    fontSize: 16,
  }

  if (message) {
    return (
      <div style={errorStyle}>
        <p>{message}</p>
      </div>
    )
  }
  return <></>
}

const Notification = ({ message }) => {
  const notificationStyle = {
    padding: '10px',
    border: 'solid green 2px',
    color: 'green',
    fontSize: 16,
  }

  if (message) {
    return (
      <div style={notificationStyle}>
        <p>{message}</p>
      </div>
    )
  }
  return <></>
}

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Hide Form</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Notification.propTypes = {
  message: PropTypes.string.isRequired,
}
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default App
