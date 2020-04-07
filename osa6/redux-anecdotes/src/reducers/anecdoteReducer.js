const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADDVOTE':
      const id = action.data.id
      const anecdote = state.find((a) => a.id === id)

      anecdote.votes += 1
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

export const initializeAnecdotes = (anec) => {
  return {
    type: 'INITIALIZE',
    data: anec,
  }
}

export const addVote = (id) => {
  return {
    type: 'ADDVOTE',
    data: { id },
  }
}
export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content,
  }
}

export default anecdoteReducer
