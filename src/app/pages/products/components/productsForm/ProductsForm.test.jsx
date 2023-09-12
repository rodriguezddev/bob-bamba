import React from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import ProductsForm from './ProductsForm'

import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../components/TestWrap'

test('renders PartnerForm', () => {
  const { result } = renderHook(() => useForm())
  const props = {
    descriptionContent: [],
    isCarrierEmpty: true,
    metaContent: {},
    productsForm: result.current,
    setMetaContent: jest.fn(),
    setDescriptionContent: jest.fn(),
    assignedCarries: [],
    setAssignedCarries: jest.fn(),
  }

  render(
    <TestWrap>
      <ProductsForm {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Nombre*')

  expect(textHeader).toBeInTheDocument()
})
