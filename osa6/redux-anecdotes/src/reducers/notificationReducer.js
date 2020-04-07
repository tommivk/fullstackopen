const notificationReducer = (state = 'NULL', action) => {
  switch (action.type) {
    case 'NEWMESSAGE':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (message) => {
  return {
    type: 'NEWMESSAGE',
    data: message,
  }
}

export default notificationReducer
