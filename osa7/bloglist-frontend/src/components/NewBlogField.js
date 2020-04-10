import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

const NewBlogField = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: '', url: '', title: '' })

  const handleNewBLog = (event) => {
    event.preventDefault()

    createNewBlog(newBlog)

    setNewBlog({ ...newBlog, author: '', url: '', title: '' })
  }

  return (
    <div>
      <h3>add new blog</h3>
      <Form onSubmit={handleNewBLog}>
        <div>
         
         <Form.Group>
         <Form.Label>title</Form.Label> 
          <input
            id='titleField'
            type='text'
            name='title'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
          </Form.Group>
        </div>
        <div>
          <Form.Group>
        <Form.Label>author</Form.Label> 
    
          <input
            id='authorField'
            type='text'
            name='Author'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
          </Form.Group>
        </div>
        <div>
          <Form.Group>
        <Form.Label>url</Form.Label> 

          <input
            id='urlField'
            type='text'
            name='url'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
          </Form.Group>
        </div>
        <div>
          <Button id='add-blog-button' type='submit'>
            Add new blog
          </Button>
        </div>
      </Form>
    </div>
  )
}
NewBlogField.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default NewBlogField
