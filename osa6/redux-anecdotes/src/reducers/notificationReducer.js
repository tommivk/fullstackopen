const notificationReducer = (state = 'NULL', action) => {
  switch (action.type) {
    case 'NEWMESSAGE':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (message, time) => {
  let timeoutId
  return async (dispatch) => {
    await dispatch({
      type: 'NEWMESSAGE',
      data: message,
    })

    function clearMessage() {
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'NEWMESSAGE',
          data: 'NULL',
        })
      }, time * 1000)
    }

    clearMessage()
    clearTimeout(timeoutId - 1)
  }
}

export default notificationReducer
