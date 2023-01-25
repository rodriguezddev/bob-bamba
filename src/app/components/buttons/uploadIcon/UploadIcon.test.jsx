import React from 'react'
import {
  render, fireEvent, getByTestId, screen,
} from '@testing-library/react'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import UploadIcon from './UploadIcon'
import '@testing-library/jest-dom'

describe('UploadIcon component', () => {
  it('should handle file input change', () => {
    const props = {
      accept: '.xlsx',
      color: 'primary',
      onChange: jest.fn(),
      toolTipInfo: 'test',
    }

    const { container } = render(
      <UploadIcon {...props}>
        <GroupAddIcon />
      </UploadIcon>,
    )

    const fileInput = getByTestId(container, 'file-input')

    const file = new File(['content'], 'test.txt', {
      type: 'text/plain',
    })

    fireEvent.change(fileInput, { target: { files: [file] } })

    const inputFile = screen.getByRole('button')

    expect(inputFile).toBeInTheDocument()
  })
})
