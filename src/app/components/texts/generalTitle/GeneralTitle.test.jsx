import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import GeneralTitle from './GeneralTitle'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('GeneralTitle component', () => {
  it('should show text default', () => {
    render(
      <ThemeProvider theme={theme}>
        <GeneralTitle text='Bamba' />
      </ThemeProvider>,
    )

    const text = screen.getByText(/Bamba/i)

    expect(text).toHaveTextContent('Bamba')
  })
})
