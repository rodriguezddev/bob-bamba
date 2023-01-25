import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import theme from '../../theme'
import '@testing-library/jest-dom'
import MainDrawer from './MainDrawer'

describe('MainDrawer components', () => {
  it('should show MainDrawer', () => {
    const props = {
      width: '18.37rem',
      display: { xs: 'none', sm: 'block' },
      open: true,
      variant: 'permanent',
    }

    render(
      <ThemeProvider theme={theme}>
        <Box>
          <MainDrawer {...props}>
            Bamba
          </MainDrawer>
        </Box>
      </ThemeProvider>,
    )

    const mainDrawer = screen.getByText('Bamba')

    expect(mainDrawer).toHaveStyle('background-color: rgb(255, 255, 255)')
  })
})
