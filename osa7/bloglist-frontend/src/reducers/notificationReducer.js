const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEWNOTIFICATION':
      return action.message

    case 'CLEARNOTIFICATION':
      return ''

    default:
      return state
  }
}
let timeoutId
export const newNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEWNOTIFICATION',
      message,
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEARNOTIFICATION',
      })
    }, 5000)
  }
}

export default notificationReducer
