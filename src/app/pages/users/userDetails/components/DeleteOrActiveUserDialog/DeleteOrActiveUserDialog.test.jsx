import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import DeleteOrActiveUserDialog from './DeleteOrActiveUserDialog'
import theme from '../../../../../theme'
import store from '../../../../../store'

describe('DeleteOrActiveUserDialog component', () => {
  it('should show DeleteOrActiveUserDialog', async () => {
    const props = {
      showActivateDialog: true,
      setShowActivateDialog: jest.fn(),
      userDetails: {
        id: 1,
        name: '55555556',
      },
    }

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <DeleteOrActiveUserDialog {...props} />
        </ThemeProvider>
      </Provider>,
    )

    const text = screen.getByText('Activar usuario')

    expect(text).toBeInTheDocument()
  })
})
