import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  console.log(notification)
  if(notification === 'NULL'){
    return(
      <></>
    )
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification