import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import store from '../../../store'
import theme from '../../../theme'

import '@testing-library/jest-dom/extend-expect'
import CreateAdminUser from './CreateAdminUser'

test('renders create admin user view', () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CreateAdminUser />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/Crear usuario administrador/i)

  expect(textHeader).toHaveTextContent('Crear usuario administrador')
})
