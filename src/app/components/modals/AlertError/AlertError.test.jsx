import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import AlertError from './AlertError'
import { errorSlice } from '../../../slices/error/errorSlice'

describe('AlertError button components', () => {
  it('should show AlertError', () => {
    const store = configureStore({
      reducer: errorSlice.reducer,
      preloadedState: {
        error: {
          codeError: 9999,
          isError: true,
          message: 'Test',
        },
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <AlertError />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>,
    )

    const text = screen.getByText(/Test/i)

    expect(text).toHaveTextContent('Test')
  })
})
