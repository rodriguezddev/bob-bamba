import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import DeactivateUserDialog from './DeactivateUserDialog'
import theme from '../../../../../theme'
import store from '../../../../../store'

describe('DeactivateUserDialog component', () => {
  it('should show DeactivateUserDialog', async () => {
    const props = {
      showDeactivateUserDialog: true,
      setShowDeactivateUserDialog: jest.fn(),
    }

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <DeactivateUserDialog {...props} />
        </ThemeProvider>
      </Provider>,
    )

    const text = screen.getByText('Desactivar usuario')

    expect(text).toBeInTheDocument()
  })
})
