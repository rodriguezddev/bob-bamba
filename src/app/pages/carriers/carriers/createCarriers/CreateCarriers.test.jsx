import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import store from '../../../../store'
import theme from '../../../../theme'
import CreateCarriers from './CreateCarriers'
import '@testing-library/jest-dom/extend-expect'

test('renders create carrier view', async () => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CreateCarriers />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/Crear carrier/i)

  expect(textHeader).toHaveTextContent('Crear carrier')
})
