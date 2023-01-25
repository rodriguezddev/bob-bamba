import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import MainFilter from './MainFilter'
import theme from '../../../theme'
import store from '../../../store'
import '@testing-library/jest-dom'

describe('MainFilter component', () => {
  it('should show component', () => {
    const mockDispatch = jest.fn()

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }))

    const props = [
      {
        id: 'type',
        name: 'Tipo',
        placeholder: 'Tipo',
        type: 'text',
      },
      {
        id: 'curp',
        name: 'curp',
        placeholder: 'curp',
        selectDetails: [{ value: 'test', name: 'Agregador' }],
        type: 'select',
      },
    ]

    render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <MainFilter
              fieldDetails={props}
              handleSearch={jest.fn()}
              value=''
            />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>,
    )

    const text = screen.getByText('Mostrar filtros')

    expect(text).toBeInTheDocument()

    fireEvent.click(screen.getByText(/Mostrar filtros/i))

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('placeholder', 'Tipo')

    fireEvent.click(screen.getByText(/Buscar/i))
    fireEvent.click(screen.getByText(/Limpiar/i))

    const option = screen.getByTestId('select-filter-value-test')

    expect(option).toHaveValue('test')
  })
})
