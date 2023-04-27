import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import NotificationInputs from './NotificationInputs'
import theme from '../../../../../theme'
import '@testing-library/jest-dom'

describe('NotificationInputs component', () => {
  it('should show input', () => {
    const props = {
      id: 'type_id',
      onChange: jest.fn(),
      value: '',
    }

    render(
      <ThemeProvider theme={theme}>
        <NotificationInputs {...props} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
