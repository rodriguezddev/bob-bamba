import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import store from '../../../store'
import theme from '../../../theme'

import '@testing-library/jest-dom/extend-expect'
import CreateProducts from './CreateProducts'

test('renders create product view', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CreateProducts />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/Crear producto/i)

  expect(textHeader).toHaveTextContent('Crear producto')
})
