import React from 'react'
import { render, screen } from '@testing-library/react'
import CreateUsersInBatch from './createUsersInBatch'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../components/TestWrap'

describe('CreateUsersInBatch component', () => {
  it('should show CreateUsersInBatch component', () => {
    render(
      <TestWrap>
        <CreateUsersInBatch />
      </TestWrap>,
    )

    const textHeader = screen.getByText('Crear usuarios')

    expect(textHeader).toHaveTextContent('Crear usuarios')
  })
})
