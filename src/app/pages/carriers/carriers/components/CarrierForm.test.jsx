import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import store from '../../../../store'
import theme from '../../../../theme'
import CarrierForm from './CarrierForm'
import '@testing-library/jest-dom/extend-expect'

test('renders create carrier form view', async () => {
  const props = {
    carrierId: '',
    isShowConfirmAlert: true,
    setIsShowUpdateAlert: jest.fn(),
    setIsShowConfirmAlert: jest.fn(),
  }

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CarrierForm {...props} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  )

  const textHeader = screen.getByText(/Nombre(s)*/i)

  expect(textHeader).toHaveTextContent('Nombre(s)*')
})
