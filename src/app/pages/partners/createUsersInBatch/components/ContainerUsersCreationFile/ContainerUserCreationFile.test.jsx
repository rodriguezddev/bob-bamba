import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ContainerUsersCreationFile from './ContainerUsersCreationFile'
import { TestWrap } from '../../../../../components/TestWrap'

describe('ContainerUsersCreationFile component', () => {
  const props = {
    fileForm: jest.fn(),
    partnerId: 'test',
  }

  it('should show ContainerUsersCreationFile component', () => {
    render(
      <TestWrap>
        <ContainerUsersCreationFile {...props} />
      </TestWrap>,
    )

    const textHeader = screen.getByText('Arrastra y suelta un archivo aquí')

    expect(textHeader).toHaveTextContent('Arrastra y suelta un archivo aquí')
  })
})
