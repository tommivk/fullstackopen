import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlogField from './NewBlogField'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const user = {
      name: 'test name',
      username: 'user',
    }
    const blog = {
      title: 'testblog',
      author: 'testauthor',
      url: 'testurl.com',
      likes: 3,
      user: {
        name: user.name,
        username: user.username,
      },
    }
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={user} handleNewLike={mockHandler} />
    )
  })

  test('renders blog title and author but not likes and url', () => {
    expect(component.container).toHaveTextContent('testblog')
    expect(component.container).not.toHaveTextContent('testurl.com')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('renders url and likes after pressing show button', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testblog')
    expect(component.container).toHaveTextContent('testauthor')
    expect(component.container).toHaveTextContent('testurl.com')
    expect(component.container).toHaveTextContent('likes')
  })

  test('liking twice calls mock function 2 times', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('<NewBlogField />', () => {
  test('when submitting new blog form callback function is called with right data', () => {
    const createNewBlog = jest.fn()

    const component = render(<NewBlogField createNewBlog={createNewBlog} />)

    const title = component.container.querySelector('#titleField')

    const author = component.container.querySelector('#authorField')
    const url = component.container.querySelector('#urlField')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'new blog title' } })
    fireEvent.change(author, { target: { value: 'new author' } })
    fireEvent.change(url, { target: { value: 'url.com' } })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)

    expect(createNewBlog.mock.calls[0][0].title).toBe('new blog title')
    expect(createNewBlog.mock.calls[0][0].author).toBe('new author')
    expect(createNewBlog.mock.calls[0][0].url).toBe('url.com')
  })
})
