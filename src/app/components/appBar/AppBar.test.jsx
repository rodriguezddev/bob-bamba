import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../theme'
import '@testing-library/jest-dom'
import AppBar from './AppBar'

describe('AppBar components', () => {
  it('should show AppBar', () => {
    const appBarProps = {
      drawer_width: '18.37rem',
      display: { sm: 'block', xs: 'block' },
    }

    render(
      <ThemeProvider theme={theme}>
        <AppBar {...appBarProps}>
          Bamba
        </AppBar>
      </ThemeProvider>,
    )

    const appBar = screen.getByText('Bamba')

    expect(appBar).toHaveTextContent('Bamba')
  })
})
