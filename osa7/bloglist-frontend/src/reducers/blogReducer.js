import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'SET_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    console.log(user)
    const response = await blogService.create(blog)
    console.log(response)
    response.user = {
      name: user.name,
      id: user.id,
      username: user.username,
    }

    dispatch({
      type: 'NEW_BLOG',
      data: response,
    })
  }
}
export const setAllBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs,
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: allBlogs,
    })
  }
}
export default blogReducer
