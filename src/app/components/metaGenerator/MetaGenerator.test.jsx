import React from 'react'
import { render, screen } from '@testing-library/react'
import MetaGenerator from './MetaGenerator'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../TestWrap'

test('renders meta generator view', async () => {
  const props = {
    setMetaContent: jest.fn(),
  }
  render(
    <TestWrap>
      <MetaGenerator {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Agregar detalles extras')

  expect(textHeader).toBeInTheDocument()
})
