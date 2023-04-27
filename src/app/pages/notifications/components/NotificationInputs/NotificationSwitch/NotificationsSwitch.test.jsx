import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import NotificationSwitch from './NotificationSwitch'
import theme from '../../../../../theme'
import '@testing-library/jest-dom'

describe('NotificationSwitch component', () => {
  it('should show switch', () => {
    const props = {
      id: 'type_id',
      onChange: jest.fn(),
      value: '',
    }

    render(
      <ThemeProvider theme={theme}>
        <NotificationSwitch {...props} />
      </ThemeProvider>,
    )

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
  })
})
