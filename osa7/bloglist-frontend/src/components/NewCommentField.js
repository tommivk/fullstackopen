import React, { useState } from 'react'

const NewCommentField = ({ blog, createNewComment }) => {
  const [comment, setComment] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    createNewComment(comment, blog.id)
    setComment('')
  }

  return (
    <div>
      <p></p>
      <form onSubmit={handleNewComment}>
        <input
          value={comment}
          type='text'
          onChange={({ target }) => setComment(target.value)}
        ></input>

        <button>Add Comment</button>
      </form>
    </div>
  )
}

export default NewCommentField
