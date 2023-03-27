import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import CreateCampaigns from './CreateCampaigns'
import store from '../../../store'
import theme from '../../../theme'
import httpService from '../../../services/api_services/HttpService'
import '@testing-library/jest-dom/extend-expect'

test('renders create partners view', async () => {
  const responseMock = {
    code: 0,
    data: {
      bamba_attendance: 'Asistencia Bamba',
      bamba_asesor: 'Asesor Bamba',
    },
  }

  const templates = {
    code: 0,
    data: {
      bienvenida_symplifica: {
        text: '¡Hola!\n\nHoy es un gran día.',
        language: 'es_MX',
        number_parameters: 0,
      },
    },
  }

  jest.spyOn(httpService, 'get').mockResolvedValueOnce(responseMock)
  jest.spyOn(httpService, 'get').mockResolvedValueOnce(templates)

  await act(async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateCampaigns />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )
  })

  const textHeader = screen.getByText(/Crear campañas/i)

  expect(textHeader).toHaveTextContent('Crear campañas')
})
