import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
      <form onSubmit={handleNewBLog}>
        <div>
          title
          <input
            id='titleField'
            type='text'
            name='title'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            id='authorField'
            type='text'
            name='Author'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            id='urlField'
            type='text'
            name='url'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <div>
          <button type='submit'>Add new blog</button>
        </div>
      </form>
    </div>
  )
}
NewBlogField.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
}

export default NewBlogField
