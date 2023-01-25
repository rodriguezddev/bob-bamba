import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import DescriptionList from './DescriptionList'

describe('DescriptionList component', () => {
  it('should show DescriptionList', () => {
    const description = {
      section: '¿Qué incluye?',
      body: [
        'Dos (2) consultas con médico especialista',
        'Atención médica presencial con médicos especialistas.',
        'Receta médica física.',
        '¿Dudas de qué medicamentos tomar? Tu Asesor Bamba te ayudará a decidir el mejor camino.',
      ],
    }

    render(
      <ThemeProvider theme={theme}>
        <DescriptionList description={description} />
      </ThemeProvider>,
    )

    const presentation = screen.getByText('¿Qué incluye?')

    expect(presentation).toBeInTheDocument()
  })
})
