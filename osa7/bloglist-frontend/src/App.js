import React, { useState, useEffect } from 'react'
import { newErrorMessage } from './reducers/errorMessageReducer'
import { newNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

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

import { Table, Form, Button, Navbar, Nav, Alert } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <input
          id='usernameField'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />

        <div>
          <Form.Label>Username:</Form.Label>
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
          <Button variant='primary' id='login-button' type='submit'>
            Login
          </Button>
        </div>
      </Form.Group>
    </Form>
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

  // const handleBlogRemove = async (blog) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to remove ${blog.title} by ${blog.author}?`
  //     )
  //   ) {
  //     try {
  //       await blogService.remove(blog.id)
  //       const filteredBlogs = blogs.filter((x) => x.id !== blog.id)
  //       dispatch(setAllBlogs(filteredBlogs))
  //       dispatch(newNotification(`${blog.title} by ${blog.author} removed`))
  //     } catch (error) {
  //       console.log('failed to remove blog')
  //     }
  //   }
  // }

  const allBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    return (
      <div className='allBlogs'>
        <Table striped hover size='sm'>
          <tbody>
            {sortedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}{' '}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
    <nav>
      {user.name} logged in{' '}
      <Button variant='secondary' onClick={logOut}>
        logout
      </Button>
    </nav>
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
      <div className=' container'>
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
        {notification && <Alert variant='success'>{notification}</Alert>}
        {/* <ErrorMessage message={errorMessage} /> */}
        {/* <Notification message={notification} /> */}
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div className='container'>
      <Router>
        <Navbar expand='lg' bg='dark' variant='dark'>
          <Nav.Link href='/'>Blogs</Nav.Link>
          <Nav.Link href='/users'>Users</Nav.Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {loggedIn(user)}
          </Navbar.Collapse>
        </Navbar>
        <div>
          {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
          {notification && <Alert variant='success'>{notification}</Alert>}
          {/* <ErrorMessage message={errorMessage} />
        <Notification message={notification} /> */}
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
            <h2>Blogs</h2>
            <Togglable buttonLabel='New Blog'>
              <NewBlogField createNewBlog={createNewBLog} />
            </Togglable>
            <br></br>
            <div id='render-blogs'>{allBlogs()}</div>
          </Route>
        </Switch>
      </Router>
    </div>
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
          <Button onClick={() => handleLike(blog)}>like</Button>
        </h3>
        <h4>Comments</h4>
        <Table striped>
          <tbody>
            {blog.comments.map((x) => (
              <tr key={x.id}>
                <td>{x.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        <Table striped>
          <tbody>
          {user.blogs.map((x) => (
            <tr key={x.id}>
              <td>
                <Link to={`/blogs/${x.id}`}>{x.title}</Link> by {x.author}{' '}
                likes: {x.likes}
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
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
        <Table>
          <tbody>
            {users.map((x) => (
              <tr key={x.id}>
                <td>
                  <strong>
                    <Link to={`/users/${x.id}`}>{x.name}</Link>
                  </strong>{' '}
                  blogs created: {x.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        <Button id='open' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Hide Form</Button>
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
