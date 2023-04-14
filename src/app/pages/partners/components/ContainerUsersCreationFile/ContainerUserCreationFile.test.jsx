import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import ContainerUsersCreationFile from './ContainerUsersCreationFile'
import store from '../../../../store'
import '@testing-library/jest-dom/extend-expect'
import theme from '../../../../theme'

describe('ContainerUsersCreationFile component', () => {
  const props = {
    fileForm: jest.fn(),
    partnerId: 'test',
  }

  it('should show ContainerUsersCreationFile component', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <ContainerUsersCreationFile {...props} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )

    const textHeader = screen.getByText('Arrastra y suelta un archivo aquí')

    expect(textHeader).toHaveTextContent('Arrastra y suelta un archivo aquí')
  })
})
