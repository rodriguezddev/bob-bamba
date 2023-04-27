import React from 'react'
import { Provider } from 'react-redux'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from '@mui/material'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import AssignUsersContainer from './AssignUsersContainer'
import '@testing-library/jest-dom/extend-expect'
import httpService from '../../../../services/api_services/HttpService'
import store from '../../../../store'
import theme from '../../../../theme'

describe('Assign user component', () => {
  it('should show Assign user', async () => {
    const { result } = renderHook(() => useForm())
    const props = {
      setUserFile: jest.fn(),
      assignUsers: result.current,
    }

    const responseMock = {
      data: {
        id: '17ffc772-5522-46a2-aa89-0f0814cee46c',
        template: 'historia_segur_mane_2',
        template_lang: 'es',
        send_date: '28-04-2023 00:00',
        sent: false,
        users: [
          {
            id: '03e6bdd1-447e-412c-a0c8-8d0b27c02bd2',
            name: 'DIANA Test',
            lastname: 'Mona',
            second_lastname: 'HERRE',
            photo: null,
            birthdate: '01-01-1970',
            gender: 'F',
            email: 'ninatest@gmail.com',
            cellphone: '5551946889',
            tax_id: 'GUBC730406PL7',
            personal_id: null,
            metadata: null,
            newsletter_sent: false,
            newsletter_date_sent: null,
            subscriptions: [],
          },
        ],
      },
    }

    const partners = {
      data: [
        {
          id: '2cf8ba04-6dfb-43cd-807f-b0722d7b7b9e',
          name: 'Ti rosa SA',
          code: 'TIA-ROSA-1',
          type: 'AGGREGATOR',
          meta: null,
          company: null,
        },
      ],
      links: {
        first: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
        last: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
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
            url: 'http://staging.bamba.tech/admin/api/v1/partners?page=1',
            label: '1',
            active: true,
          },
          {
            url: null,
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
        path: 'http://staging.bamba.tech/admin/api/v1/partners',
        per_page: 100,
        to: 1,
        total: 1,
      },
      code: 0,
    }

    jest.spyOn(httpService, 'get').mockResolvedValue(responseMock)
    jest.spyOn(httpService, 'get').mockResolvedValueOnce(partners)

    await act(async () => {
      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <AssignUsersContainer {...props} />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>,
      )
    })

    const textTitle = screen.getByText(/Partner*/)

    expect(textTitle).toBeInTheDocument()
  })
})
