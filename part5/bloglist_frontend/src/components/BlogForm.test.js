
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "testing author",
    url: "newUrl",
    likes: "newLikes"
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  const element_2 = screen.getByText('testing author')
  expect(element).toBeDefined()
  expect(element_2).toBeDefined()

  

})
