import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import UploadUsersCampaignButton from './UploadUsersCampaignButton'
import theme from '../../../../theme'
import store from '../../../../store'
import '@testing-library/jest-dom'

describe('UploadUsersCampaignButton components', () => {
  it('should show UploadUsersCampaignButton', () => {
    const setUserFile = jest.fn()

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UploadUsersCampaignButton setUserFile={setUserFile} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )

    const inputFile = screen.getByRole('button')

    expect(inputFile).toBeInTheDocument()
  })
})
