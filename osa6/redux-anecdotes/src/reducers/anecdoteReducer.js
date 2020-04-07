import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADDVOTE':
      const id = action.data.id
      const anecdote = state.find((a) => a.id === id)
      const anecdotes = state.map((x) => (x.id !== id ? x : anecdote))

      return anecdotes.sort((a, b) =>
        a.votes < b.votes
          ? 1
          : a.votes === b.votes
          ? a.content > b.content
            ? 1
            : -1
          : -1
      )

    case 'INITIALIZE':
      return action.data

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes,
    })
  }
}

export const addVote = (anecdote) => {
  console.log(anecdote)
  return async (dispatch) => {
    let updatedAnecdote = anecdote
    updatedAnecdote.votes+= 1
    const id = anecdote.id

    const newAnecdote = await anecdoteService.update(id, updatedAnecdote)
    dispatch({
      type: 'ADDVOTE',
      data: newAnecdote,
    })
  }
}
export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
