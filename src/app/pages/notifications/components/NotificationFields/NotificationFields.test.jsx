import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import NotificationFields from './NotificationFields'
import theme from '../../../../theme'
import '@testing-library/jest-dom'

describe('NotificationFields component', () => {
  it('should show input', () => {
    const props = {
      id: 'type_id',
      input: {
        type: 'string',
        required: true,
      },
      onChange: jest.fn(),
      value: '',
    }

    render(
      <ThemeProvider theme={theme}>
        <NotificationFields {...props} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('should show checkbox', () => {
    const props = {
      id: 'type_id',
      input: {
        type: 'boolean',
        required: true,
      },
      onChange: jest.fn(),
      value: '',
    }

    render(
      <ThemeProvider theme={theme}>
        <NotificationFields {...props} />
      </ThemeProvider>,
    )

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
  })
})
