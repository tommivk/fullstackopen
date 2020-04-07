import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter) {
      return state.anecdotes
    }
    return state.anecdotes.filter((x) =>
      x.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    
    console.log('vote', id)
    const anecdote = anecdotes.filter((x) => x.id === id)
    dispatch(addVote(anecdote[0]))
    dispatch(changeNotification(`you voted '${anecdote[0].content}'`))
    setTimeout(() => nullMessage(), 5000)
  }

  const nullMessage = () => {
    dispatch(changeNotification('NULL'))
  }

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
