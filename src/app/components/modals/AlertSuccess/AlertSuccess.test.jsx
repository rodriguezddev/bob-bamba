import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import AlertSuccess from './AlertSuccess'
import { successMessageSlice } from '../../../slices/successMessage/successMessageSlice'

describe('AlertSuccess button components', () => {
  it('should show AlertSuccess', () => {
    const store = configureStore({
      reducer: successMessageSlice.reducer,
      preloadedState: {
        successMessage: {
          isSuccess: true,
          message: { title: 'Test' },
        },
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <AlertSuccess />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>,
    )

    const title = screen.getByText(/Test/i)

    expect(title).toHaveTextContent('Test')
  })
})
