import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ThemeProvider } from '@mui/material'
import ProductsContainer from './ProductsContainer'
import '@testing-library/jest-dom'
import theme from '../../../../../theme'
import store from '../../../../../store'

describe('ProductsContainer components', () => {
  it('should show ProductsContainer', async () => {
    const props = {
      assignedSubscriptions: jest.fn(),
      subscriptions: { data: [{ id: '1', sku: '1', name: '1' }] },
    }

    await act(async () => {
      render(
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ProductsContainer {...props} />
          </Provider>
        </ThemeProvider>,
      )
    })

    const textTitle = screen.getByText('Productos disponibles')

    expect(textTitle).toBeInTheDocument()
  })
})
