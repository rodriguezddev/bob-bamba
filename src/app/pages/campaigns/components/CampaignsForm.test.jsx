import React from 'react'
import { Provider } from 'react-redux'
import { render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from '@mui/material'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import theme from '../../../theme'
import CampaignsForm from './CampaignsForm'
import store from '../../../store'
import httpService from '../../../services/api_services/HttpService'
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
      code: 0,
      data: {
        bamba_attendance: 'Asistencia Bamba',
        bamba_asesor: 'Asesor Bamba',
      },
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

    const textTitle = screen.getByText(/Cuentas de WhatsApp/)

    expect(textTitle).toBeInTheDocument()
  })
})
