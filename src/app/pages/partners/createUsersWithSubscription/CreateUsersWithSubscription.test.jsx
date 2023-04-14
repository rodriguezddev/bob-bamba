import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import CreateUsersWithSubscription from './CreateUsersWithSubscription'
import store from '../../../store'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../theme'

describe('CreateUsersWithSubscription component', () => {
  it('should show CreateUsersWithSubscription component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CreateUsersWithSubscription />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )

    const textHeader = screen.getByText('Crear usuarios con suscripción')

    expect(textHeader).toHaveTextContent('Crear usuarios con suscripción')
  })
})
