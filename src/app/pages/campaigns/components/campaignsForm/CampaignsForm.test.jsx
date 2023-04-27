import React from 'react'
import { Provider } from 'react-redux'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from '@mui/material'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import theme from '../../../../theme'
import CampaignsForm from './CampaignsForm'
import store from '../../../../store'
import httpService from '../../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

describe('FormAlert components', () => {
  it('should show FormAlert', async () => {
    const { result } = renderHook(() => useForm())
    const props = {
      campaignId: '8827daa2-78ea-4d00-af5f-c2dc7eba13c7',
      isShowConfirmAlert: false,
      setIsShowConfirmAlert: jest.fn(),
      setIsShowUpdateAlert: jest.fn(),
      campaignsForm: result.current,
    }

    const responseMock = {
      data: [
        {
          id: '7c775d03-f6cb-48cb-8571-d2c1ab282860',
          name: 'Agente Bamba (5625774041)',
          keys: {
            phone_id: '116422888031263',
            account_id: '114901301537529',
          },
          is_enabled: true,
          provider: 'WHATSAPP',
          notification_type: 'WHATSAPP',
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
        prev: null,
        next: null,
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://staging.bamba.tech/admin/api/v1/notice-accounts?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/notice-accounts',
        per_page: 10,
        to: 5,
        total: 5,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <CampaignsForm {...props} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>,
      )
    })

    const textTitle = screen.getByText(/Cuentas de WhatsApp*/)

    expect(textTitle).toBeInTheDocument()
  })
})
