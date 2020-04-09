const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEWNOTIFICATION':
      return action.data

    case 'CLEARNOTIFICATION':
      return ''

    default:
      return state
  }
}

export const newNotification = (message) => {
  return {
    type: 'NEWNOTIFICATION',
    data: message,
  }
}

export default notificationReducer
