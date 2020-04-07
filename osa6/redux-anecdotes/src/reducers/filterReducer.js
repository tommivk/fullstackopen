const FilterReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data
    default:
      return state
  }
}

export const filterChange = (value) => {
  return {
    type: 'CHANGE',
    data: value,
  }
}

export default FilterReducer
