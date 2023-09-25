import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import AdminForm from './AdminForm'

import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../components/TestWrap'

test('renders AdminForm', () => {
  const { result } = renderHook(() => useForm())
  const props = {
    adminForm: result.current,
  }

  render(
    <TestWrap>
      <AdminForm {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Nombre(s)*')

  expect(textHeader).toBeInTheDocument()
})
