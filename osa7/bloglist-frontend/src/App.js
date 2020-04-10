import React, { useState, useEffect } from 'react'
import { newErrorMessage } from './reducers/errorMessageReducer'
import { newNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import PropTypes from 'prop-types'
import NewBlogField from './components/NewBlogField'
import NewCommentField from './components/NewCommentField'
import {
  initializeBlogs,
  setAllBlogs,
  createBlog,
} from './reducers/blogReducer'
import { setActiveUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const errorMessage = useSelector((state) => state.errorMessage)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setActiveUser(user))

      setUsername('')
      setPassword('')

      dispatch(newNotification(`logged in as ${user.username}`))
    } catch (exception) {
      dispatch(newErrorMessage('Wrong username or password'))
    }
  }

  const createNewBLog = async (newBlog) => {
    const newBlogObject = {
      author: newBlog.author,
      title: newBlog.title,
      url: newBlog.url,
      likes: 0,
    }
    const activeUser = user

    try {
      dispatch(createBlog(newBlogObject, activeUser))

      dispatch(
        newNotification(
          `new blog ${newBlogObject.title} by ${newBlogObject.author} added!`
        )
      )
    } catch (error) {
      dispatch(newErrorMessage('adding new blog failed'))
    }
  }
  const createNewComment = async (comment, blogId) => {
    const newComment = {
      content: comment,
    }
    const response = await blogService.addComment(blogId, newComment)
    const blog = blogs.find((x) => x.id === blogId)
    blog.comments = blog.comments.concat(response)
    let filteredBlogs = blogs.filter((x) => x.id !== blogId)
    dispatch(setAllBlogs(filteredBlogs.concat(blog)))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          id='usernameField'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id='passwordField'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
          autoComplete='off'
        />
      </div>
      <div>
        <button id='login-button' type='submit'>
          Login
        </button>
      </div>
    </form>
  )

  const handleNewLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      comments: blog.comments,
      user: {
        id: blog.user.id,
        name: blog.user.name,
        username: blog.user.username,
      },
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)

      response.user = {
        id: response.user,
        name: blog.user.name,
        username: blog.user.username,
      }
      const filterBlog = blogs.filter((x) => x.id !== response.id)
      const allBlogs = filterBlog.concat(response)
      dispatch(
        setAllBlogs(allBlogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)))
      )
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
        dispatch(setAllBlogs(filteredBlogs))
        dispatch(newNotification(`${blog.title} by ${blog.author} removed`))
      } catch (error) {
        console.log('failed to remove blog')
      }
    }
  }

  const allBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    return (
      <div className='allBlogs'>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
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
      dispatch(setActiveUser(null))

      dispatch(newNotification('logged out successfully'))
    } catch (error) {
      dispatch(newErrorMessage('Something went wrong'))
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
      dispatch(setActiveUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
    <Router>
      <div>
        <Link to='/'>Blogs </Link>
        <Link to='/users'>Users</Link>
        {loggedIn(user)}
      </div>
      <div>
        <ErrorMessage message={errorMessage} />
        <Notification message={notification} />
        <h2>blogs</h2>
      </div>
      <Switch>
        <Route path='/users/:id'>
          <ShowSingleUser users={users} />
        </Route>
        <Route path='/users'>
          <ShowUserData users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <ShowSingleBlog
            blogs={blogs}
            handleLike={handleNewLike}
            createNewComment={createNewComment}
          />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='New Blog'>
            <NewBlogField createNewBlog={createNewBLog} />
          </Togglable>
          <br></br>
          <div id='render-blogs'>{allBlogs()}</div>
        </Route>
      </Switch>
    </Router>
  )
}
const ShowSingleBlog = ({ blogs, handleLike, createNewComment }) => {
  const id = useParams().id
  const blog = blogs.find((x) => x.id === id)
  if (blog) {
    return (
      <div>
        <h2>{blog.title}</h2>
        <h3>by {blog.author}</h3>
        <h3>
          likes: {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </h3>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map((x) => (
            <li key={x.id}>{x.content}</li>
          ))}
        </ul>
        <NewCommentField createNewComment={createNewComment} blog={blog} />
      </div>
    )
  }
  return <></>
}

const ShowSingleUser = ({ users }) => {
  const [user, setUser] = useState(null)
  const id = useParams().id

  useEffect(() => {
    userService.findById(id).then((res) => setUser(res))
  }, [id])
  if (!user) {
    return null
  }
  if (user) {
    console.log(user)
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((x) => (
            <li key={x.id}>
              <Link to={`/blogs/${x.id}`}>{x.title}</Link> by {x.author} likes:{' '}
              {x.likes}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return <div></div>
}

const ShowUserData = ({ users }) => {
  if (users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <ul>
          {console.log(users)}
          {users.map((x) => (
            <li key={x.id}>
              <strong>
                <Link to={`/users/${x.id}`}>{x.name}</Link>
              </strong>{' '}
              blogs created: {x.blogs.length}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return <div>empty</div>
}

const ErrorMessage = ({ message }) => {
  const errorStyle = {
    padding: '10px',
    border: 'solid rgb(255, 0, 0) 2px',
    color: 'rgb(255, 0, 0)',
    fontSize: 16,
  }

  if (message) {
    return (
      <div className='error' style={errorStyle}>
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
        <button id='open' onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
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
