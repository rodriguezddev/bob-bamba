import React from 'react'
import { render, screen } from '@testing-library/react'
import CreateAdminUser from './CampaignUploadMessage'
import { TestWrap } from '../../../../components/TestWrap'
import '@testing-library/jest-dom/extend-expect'

test('renders CampaignUploadMessage view', () => {
  const campaign = {
    newsletter: {
      template: 'recordatorio_bloqueador',
      send_date: '2023-07-31 00:00',
      template_lang: 'es',
      sent: false,
      id: 'da38bdda-d773-4870-8a8a-2dd4763abb07',
      notice_account: {
        name: 'Agente Bamba (5625774041)',
      },
      partner: {
        name: 'Bimbo',
      },
    },
    users: {
      rows_total: 1,
      processed_total: 0,
      errors: {
        '2.cellphone': [
          'El usuario con este campo cellphone no existe para este partner',
        ],
      },
    },
  }

  render(
    <TestWrap>
      <CreateAdminUser campaign={campaign} />
    </TestWrap>,
  )

  const textHeader = screen.getByText(/El registro contiene errores/i)

  expect(textHeader).toHaveTextContent('El registro contiene errores')
})
