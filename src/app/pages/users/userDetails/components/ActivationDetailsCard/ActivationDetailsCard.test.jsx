import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import '@testing-library/jest-dom'
import theme from '../../../../../theme'
import store from '../../../../../store'
import ActivationDetailsCard from './ActivationDetailsCard'

describe('ActivationCard components', () => {
  it('should show activation card', () => {
    const props = {
      activationDate: '09/12/2022',
      activationType: 'Mes',
      nextActivation: '08/01/2023',
    }

    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ActivationDetailsCard {...props} />
        </Provider>
      </ThemeProvider>,
    )

    const textTitle = screen.getByText('Fecha de activación:')

    expect(textTitle).toBeInTheDocument()
  })
})
