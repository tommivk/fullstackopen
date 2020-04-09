const errorMessageReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEWERROR':
      return action.message

    case 'CLEARERROR':
      return ''

    default:
      return state
  }
}
let timeoutId
export const newErrorMessage = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEWERROR',
      message,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEARERROR',
      })
    }, 5000)
  }
}

export default errorMessageReducer
