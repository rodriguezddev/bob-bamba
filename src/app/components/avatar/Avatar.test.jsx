import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../theme'
import '@testing-library/jest-dom'
import Avatar from './Avatar'

describe('Avatar component', () => {
  it('should show avatar', () => {
    render(
      <ThemeProvider theme={theme}>
        Bamba
        <Avatar gender='M' />
      </ThemeProvider>,
    )

    const avatar = screen.getByText('Bamba')

    expect(avatar).toHaveTextContent('Bamba')
  })
})
