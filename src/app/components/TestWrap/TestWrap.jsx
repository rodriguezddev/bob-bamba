import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@emotion/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store'
import theme from '../../theme'

const TestWrap = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </Provider>
)

TestWrap.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TestWrap
