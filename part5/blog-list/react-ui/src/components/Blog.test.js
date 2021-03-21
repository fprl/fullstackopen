import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM, waitFor } from '@testing-library/dom'
import { Blog } from './Blog'

// component.debug()
// console.log(prettyDOM(element))

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'A test',
      author: 'Franco Romano',
      user: {
        username: 'francoromanol'
      },
      likes: 5,
    }

    const user = {
      username: 'francoromanol'
    }

    component = render(<Blog blog={blog} user={user} />)
  })

  test('when element is rendered, only displays title and author', () => {
    const visibleInformation = component.getByText('A test by Franco Romano')
    const invisibleElement = component.container.querySelector('.blog-info div')

    expect(visibleInformation).toBeDefined()
    expect(invisibleElement).toHaveClass('none')
  })

  test('when element toggle visibility, blog url and number of likes are displayed', () => {
    const toggleButton = component.getByText('view')
    const invisibleElement = component.container.querySelector('.blog-info div')

    fireEvent.click(toggleButton)

    expect(toggleButton).toHaveTextContent('hide')
    expect(invisibleElement).not.toHaveClass('none')

  })

  test.only('when like button is clicked, likes state changes', async () => {
    const addLikesButton = component.container.querySelector('.click')
    const likesCounter = component.container.querySelector('.likes-counter')

    fireEvent.click(addLikesButton)
    const likeCount = await waitFor(() => component.getByText('likes: 6'))

    console.log(prettyDOM(likeCount))
    expect(likeCount).toHaveTextContent('6')
  })

})
