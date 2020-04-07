import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnec = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnec))
    dispatch(changeNotification(`you added ${content}`))
    setTimeout(() => nullMessage(), 5000)
  }

  const nullMessage = () => {
    dispatch(changeNotification('NULL'))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
