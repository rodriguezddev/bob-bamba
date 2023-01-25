import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import MainPaper from './MainPaper'

describe('MainPaper components', () => {
  it('should show template', () => {
    render(
      <ThemeProvider theme={theme}>
        <MainPaper>
          Bamba
        </MainPaper>
      </ThemeProvider>,
    )

    const content = screen.getByText('Bamba')

    expect(content).toHaveTextContent('Bamba')
  })
})
