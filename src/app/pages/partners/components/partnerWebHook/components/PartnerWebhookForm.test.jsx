import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import PartnerWebhookForm from './PartnerWebhookForm'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../../components/TestWrap'

test('renders PartnerWebhookForm', () => {
  const { result } = renderHook(() => useForm())
  const props = {
    webhookPartnerForm: result.current,
  }
  render(
    <TestWrap>
      <PartnerWebhookForm {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Url del webhook*')

  expect(textHeader).toBeInTheDocument(true)
})
