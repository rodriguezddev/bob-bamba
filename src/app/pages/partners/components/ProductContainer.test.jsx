import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import ProductContainer from './ProductContainer'
import store from '../../../store'

describe('productContainer components', () => {
  it('should show alert title', () => {
    const props = {
      assignedProducts: jest.fn(),
      productPartner: [{ id: '1', sku: '1', name: '1' }],
      setAssignedProducts: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ProductContainer {...props} />
        </Provider>
      </ThemeProvider>,
    )

    const textTitle = screen.getByText('Productos disponibles')

    expect(textTitle).toBeInTheDocument()
  })
})
