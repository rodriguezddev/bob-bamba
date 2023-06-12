import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import PartnerForm from './PartnerForm'

import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../components/TestWrap'

test('renders PartnerForm', () => {
  const { result } = renderHook(() => useForm())
  const props = {
    partner: {
      id: 'a4',
      name: 'Test',
      code: 'TEST',
      type: 'SPONSOR',
      meta: null,
      company: null,
    },
    partnerForm: result.current,
  }

  render(
    <TestWrap>
      <PartnerForm {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Nombre*')

  expect(textHeader).toHaveTextContent('Nombre*')
})
