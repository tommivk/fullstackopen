import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleNewLike, handleBlogRemove }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  const toggleHidden = () => {
    setBlogHidden(!blogHidden)
  }

  const closeWhenHidden = { display: blogHidden ? '' : 'none' }
  const openWhenHidden = {
    display: blogHidden ? 'none' : '',
    border: '2px solid black',
    padding: '3px',
    margin: '3px',
  }

  const showRemoveButton = {
    display: blog.user.username === user.username ? '' : 'none',
  }
  if (blogHidden) {
    return (
      <div>
        <div style={closeWhenHidden}>
          {blog.title} {blog.author}{' '}
          <button id='show-blog-button' onClick={() => toggleHidden()}>
            show
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div style={openWhenHidden}>
        {blog.title} <button onClick={() => toggleHidden()}>hide</button>
        <br />
        {blog.author} <br />
        {blog.url} <br />
        <div id='blogLikes'>likes {blog.likes} </div>
        <button id='add-like-button' onClick={() => handleNewLike(blog)}>
          like
        </button>{' '}
        <br />
        added by: {blog.user.name} <br />
        <div style={showRemoveButton}>
          <button
            id='remove-blog-button'
            onClick={() => handleBlogRemove(blog)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  handleBlogRemove: PropTypes.func.isRequired,
  handleNewLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog
