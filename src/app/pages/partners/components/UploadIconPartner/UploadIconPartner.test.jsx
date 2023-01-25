import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import theme from '../../../../theme'
import '@testing-library/jest-dom'
import UploadIconPartner from './UploadIconPartner'
import store from '../../../../store'

describe('UploadIconPartner components', () => {
  it('should show UploadIconPartner', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UploadIconPartner
              icon={<GroupAddIcon />}
              partner={{
                id: 'bamba',
                name: 'Bamba',
              }}
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )

    const inputFile = screen.getByRole('button')

    expect(inputFile).toBeInTheDocument()
  })
})
