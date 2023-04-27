import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import GlobalSpinner from './GlobalSpinner'
import { loadingSlice } from '../../../slices/loading/loadingSlice'

describe('GlobalSpinner button components', () => {
  it('should show GlobalSpinner', () => {
    const store = configureStore({
      reducer: loadingSlice.reducer,
      preloadedState: {
        loading: {
          isLoading: true,
        },
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Provider store={store}>
            <GlobalSpinner />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>,
    )

    const presentation = screen.getAllByRole('progressbar', { hidden: true })

    expect(presentation).toBeDefined()
  })
})
