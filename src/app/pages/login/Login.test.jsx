import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Login from './Login'
import store from '../../store'
import theme from '../../theme'

import '@testing-library/jest-dom/extend-expect'

test('renders login view', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/PANEL/i)

  expect(textHeader).toHaveTextContent('PANEL')
})
