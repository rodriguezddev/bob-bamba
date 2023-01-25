import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import CreatePartners from './CreatePartners'
import store from '../../../store'
import theme from '../../../theme'

import '@testing-library/jest-dom/extend-expect'

test('renders create partners view', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CreatePartners />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/Crear partner/i)

  expect(textHeader).toHaveTextContent('Crear partner')
})
