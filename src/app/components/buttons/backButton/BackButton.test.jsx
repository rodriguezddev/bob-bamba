import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import store from '../../../store'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import BackButton from './BackButton'

describe('Back button components', () => {
  it('should show back button', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <BackButton />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>,
    )

    const text = screen.getByText(/Volver/i)

    expect(text).toHaveTextContent('Volver')
  })
})
