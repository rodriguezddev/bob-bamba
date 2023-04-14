import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DropZone from './DropZone'

import '@testing-library/jest-dom/extend-expect'

describe('MyDropzone component', () => {
  const propsDropZone = {
    accept: 'image/png',
    file: {},
    onChange: jest.fn(),
  }

  it('should select file', () => {
    const { getByText, getByTestId } = render(<DropZone {...propsDropZone} />)
    const dropzone = getByTestId('dropzone')
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    fireEvent.drop(dropzone, { dataTransfer: { files: [file] } })

    expect(getByText(/Archivo seleccionado:/i)).toBeInTheDocument()
  })

  it('should select file with click', () => {
    const { getByText, getByTestId } = render(<DropZone {...propsDropZone} />)
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const input = getByTestId('dropzone-input')

    fireEvent.change(input, { target: { files: [file] } })

    expect(getByText(/Archivo seleccionado/i)).toBeInTheDocument()
  })
})
