import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from '@mui/material'
import theme from '../../../../theme'
import CarriesServicesContainer from './CarriesServicesContainer'
import store from '../../../../store'
import httpService from '../../../../services/api_services/HttpService'
import '@testing-library/jest-dom'

describe('CarriesServicesContainer components', () => {
  it('should show alert title', async () => {
    const props = {
      assignedCarriesServices: jest.fn(),
      carriers: [{ id: '1', sku: '1', name: '1' }],
    }

    const responseMock = {
      data: [
        {
          id: '484c3b760478',
          name: 'bamba test 2',
          sku: 'bamba-test-2',
          cost_per_year: 21,
          cost_per_month: 31,
          is_enabled: false,
          carrier: {
            id: '610edb84e20d',
            name: 'BAMBA',
            code: 'BAMBA',
            is_enabled: true,
          },
          category: {
            id: '1c525b9b25a0',
            name: 'insurance',
            code: 'INSURANCE',
          },
        },
        {
          id: '6d5fc025c307',
          name: 'bamba test 3',
          sku: 'bamba-test-3',
          cost_per_year: 23,
          cost_per_month: 24,
          is_enabled: false,
          carrier: {
            id: '610edb84e20d',
            name: 'BAMBA',
            code: 'BAMBA',
            is_enabled: true,
          },
          category: {
            id: 'a7827e9ff42e',
            name: 'assistance',
            code: 'ASSISTANCE',
          },
        },
      ],
      links: {
        first: '',
        last: '',
        prev: null,
        next: '',
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 4,
        links: [],
        path: '',
        per_page: 10,
        to: 10,
        total: 38,
      },
      code: 0,
    }

    httpService.get = jest.fn().mockResolvedValue(responseMock)

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CarriesServicesContainer {...props} />
          </Provider>
        </ThemeProvider>,
      )
    })

    const textTitle = screen.getByText('Carrier services disponibles')

    expect(textTitle).toBeInTheDocument()
  })
})
