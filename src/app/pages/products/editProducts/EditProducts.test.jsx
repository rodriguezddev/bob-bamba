import React from 'react'
import { render, screen } from '@testing-library/react'
import EditProducts from './EditProducts'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../components/TestWrap'

test('renders edit product view', async () => {
  render(
    <TestWrap>
      <EditProducts />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Actualizar producto')

  expect(textHeader).toBeInTheDocument()
})
