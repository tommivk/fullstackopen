import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterField from './components/FilterField'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((all) => dispatch(initializeAnecdotes(all)))
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <FilterField />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
