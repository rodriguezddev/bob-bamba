import React from 'react'
import { render, screen } from '@testing-library/react'
import CreateNotification from './CreateMessages'
import '@testing-library/jest-dom/extend-expect'
import TestWrap from '../../../components/TestWrap/TestWrap'

test('renders create notifications view', async () => {
  render(
    <TestWrap>
      <CreateNotification />
    </TestWrap>,
  )

  const textHeader = screen.getByText(/Crear mensaje/i)

  expect(textHeader).toHaveTextContent('Crear mensaje')
})
