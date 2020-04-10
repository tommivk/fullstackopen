import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
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

        <Button type='submit'>Add Comment</Button>
      </form>
    </div>
  )
}

export default NewCommentField
