const errorMessageReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEWERROR':
      return action.data

    case 'CLEARERROR':
      return ''

    default:
      return state
  }
}

export const newErrorMessage = (message) => {
  return {
    type: 'NEWERROR',
    data: message,
  }
}

export default errorMessageReducer
