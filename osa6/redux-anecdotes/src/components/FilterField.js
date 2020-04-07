import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const FilterField = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }
  return (
    <div>
      filter <input onChange={handleChange}></input>
      <br></br>
      <br></br>
    </div>
  )
}

export default FilterField
