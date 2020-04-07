import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  console.log(props.anecdotes)
  const anecdotes = () => {
    if (!props.filter) {
      return props.anecdotes
    }
    return props.anecdotes.filter((x) =>
      x.content.toLowerCase().includes(props.filter.toLowerCase())
    )
  }

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = props.anecdotes.filter((x) => x.id === id)
    props.addVote(anecdote[0])
    props.changeNotification(`you voted '${anecdote[0].content}'`, 5)
  }

  return (
    <div>
      {anecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    message: state.message,
  }
}

const mapDispatchToProps = {
  addVote,
  changeNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
