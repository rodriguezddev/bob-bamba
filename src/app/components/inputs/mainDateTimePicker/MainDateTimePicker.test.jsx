import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { es } from 'date-fns/locale'
import DateFnsUtils from '@date-io/date-fns'
import MainDatePicker from './MainDateTimePicker'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('MainInput component', () => {
  it('should show input', () => {
    const fieldProps = {
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          adapterLocale={es}
          dateAdapter={AdapterDateFns}
          localeText={{ cancelButtonLabel: 'Cancelar' }}
          utils={DateFnsUtils}
        >
          <MainDatePicker {...fieldProps} />
        </LocalizationProvider>
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
