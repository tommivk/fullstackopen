import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  const submit = async (event) => {
      console.log(username, password)
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit = {submit}>
        <div>
          username <input value = {username} type='text' onChange = {(({target}) => setUsername(target.value))}/>
        </div>
        <div>
          password <input value = {password} type='password' onChange= {({target})=> setPassword(target.value)}></input>
        </div>
        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
