import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import errorMessageReducer from './reducers/errorMessageReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    errorMessage: errorMessageReducer,
    notification: notificationReducer
})
const store = createStore(reducer)

console.log(store.getState())

ReactDOM.render(
<Provider store = {store}>
<App />
</Provider>
, document.getElementById('root'))

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
  })