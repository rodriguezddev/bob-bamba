import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import PdfViewer from './PdfViewer'

describe('Pdf viewer components', () => {
  it('should show viewer title', () => {
    const buttonProps = {
      file: '',
      isOpen: true,
      pdfViewerTitle: 'Certificado',
      pdfViewerButtonText: 'Cerrar',
      setIsOpen: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <PdfViewer {...buttonProps}>Enviar</PdfViewer>
      </ThemeProvider>,
    )

    const presentation = screen.getByText('Certificado')

    expect(presentation).toBeInTheDocument()
  })

  it('should show Viewer button', () => {
    const buttonProps = {
      file: '',
      isOpen: true,
      pdfViewerTitle: 'Certificado',
      pdfViewerButtonText: 'Cerrar',
      setIsOpen: jest.fn(),
    }

    render(
      <ThemeProvider theme={theme}>
        <PdfViewer {...buttonProps} />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Cerrar')
  })
})
