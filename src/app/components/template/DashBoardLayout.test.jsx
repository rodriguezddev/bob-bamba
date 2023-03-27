import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store'
import theme from '../../theme'
import DashboardLayout from './DashboardLayout'
import '@testing-library/jest-dom'

describe('Dashboard template', () => {
  it('should show template', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <DashboardLayout>Bamba</DashboardLayout>
          </Provider>
        </BrowserRouter>
      </ThemeProvider>,
    )

    const content = screen.getAllByRole('button')

    expect(content).toHaveLength(9)
  })
})
