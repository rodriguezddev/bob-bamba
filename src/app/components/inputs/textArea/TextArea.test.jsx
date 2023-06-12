import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import TextArea from './TextArea'
import theme from '../../../theme'
import '@testing-library/jest-dom'

describe('TextArea component', () => {
  it('should show TextArea', () => {
    const fieldProps = {
      onChange: jest.fn(),
      type: 'text',
    }

    render(
      <ThemeProvider theme={theme}>
        <TextArea {...fieldProps} />
      </ThemeProvider>,
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })
})
