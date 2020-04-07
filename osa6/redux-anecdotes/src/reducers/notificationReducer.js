const notificationReducer = (state = 'NULL', action) => {
  switch (action.type) {
    case 'NEWMESSAGE':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (message, time) => {
  return async (dispatch) => {
    await dispatch({
      type: 'NEWMESSAGE',
      data: message,
    })
    setTimeout(() => {
      dispatch({
        type: 'NEWMESSAGE',
        data: 'NULL',
      })
    }, time * 1000)
  }
}

export default notificationReducer
