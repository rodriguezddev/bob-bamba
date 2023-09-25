import React from 'react'
import { render, screen } from '@testing-library/react'
import UpdateAdmin from './UpdateAdmin'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../components/TestWrap'

test('renders UpdateAdmin', () => {
  const props = {
    dialogUpdate: jest.fn(),
    admin: {
      id: 'a4',
      name: 'Test',
      lastname: 'TEST',
      email: 'test@gmail.com',
    },
    isShowDialogUpdate: true,
  }

  render(
    <TestWrap>
      <UpdateAdmin {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Se actualizará el administrador Test TEST')

  expect(textHeader).toBeInTheDocument()
})
