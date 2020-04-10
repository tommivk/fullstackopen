import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import errorMessageReducer from './reducers/errorMessageReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  errorMessage: errorMessageReducer,
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
})
const store = createStore(reducer, applyMiddleware(thunk))

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
