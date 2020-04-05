const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newState = {
        ...state,
        good: state.good +1
      }
      return newState
    case 'OK':
      const addOK = {
        ...state,
        ok: state.ok +1
      }
      return addOK
    case 'BAD':
      const addBad = {
        ...state,
        bad: state.bad +1
      }
      return addBad
    case 'ZERO':
      const clearState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return clearState
    default: return state
  }
  
}

export default counterReducer