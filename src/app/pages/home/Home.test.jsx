import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from './Home'

test('renders app', () => {
  render(<Home />)

  const textHeader = screen.getByText(/Bienvenido a/i)

  expect(textHeader).toHaveTextContent('Bienvenido a')
})
