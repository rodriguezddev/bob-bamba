import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import theme from '../../../theme'
import '@testing-library/jest-dom'
import UploadUsersCampaignIconButton from './UploadUsersCampaignIconButton'
import store from '../../../store'

describe('UploadUsersCampaignIconButton components', () => {
  it('should show UploadUsersCampaignIconButton', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UploadUsersCampaignIconButton
              icon={<GroupAddIcon />}
              campaignId='8827daa2-78ea-4d00-af5f-c2dc7eba13c7'
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>,
    )

    const inputFile = screen.getByRole('button')

    expect(inputFile).toBeInTheDocument()
  })
})
