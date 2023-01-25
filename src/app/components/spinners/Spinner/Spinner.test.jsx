import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import Spinner from './Spinner'

describe('Spinner components', () => {
  it('should show spinner', () => {
    const loading = {
      loading: true,
    }

    render(
      <ThemeProvider theme={theme}>
        <Spinner {...loading} />
      </ThemeProvider>,
    )

    const presentation = screen.getAllByRole('progressbar', { hidden: true })

    expect(presentation).toBeDefined()
  })
})
