import React from 'react'
import { render, screen } from '@testing-library/react'
import UpdatePartner from './UpdatePartner'
import '@testing-library/jest-dom/extend-expect'
import { TestWrap } from '../../../../components/TestWrap'

test('renders PartnerForm', () => {
  const props = {
    dialogUpdate: jest.fn(),
    partner: {
      id: 'a4',
      name: 'Test',
      code: 'TEST',
      type: 'SPONSOR',
      meta: null,
      company: null,
    },
    isShowDialogUpdate: true,
  }

  render(
    <TestWrap>
      <UpdatePartner {...props} />
    </TestWrap>,
  )

  const textHeader = screen.getByText('Se actualizará el partner Test')

  expect(textHeader).toHaveTextContent('Se actualizará el partner Test')
})
