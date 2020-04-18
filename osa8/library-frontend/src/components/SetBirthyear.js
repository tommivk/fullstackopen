import React, { useState } from 'react'
import { SET_BIRTHYEAR } from '../queries'
import { useMutation } from '@apollo/client'

const SetBirthyear = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [setBirthyear] = useMutation(SET_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    setBirthyear({ variables: { name, year } })
    console.log(name, year)
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select  value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          born{' '}
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          ></input>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default SetBirthyear
