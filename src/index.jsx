import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ThemeProvider } from '@emotion/react'
import { initSentry } from './app/services/sentry/sentryService'
import App from './app/App'
import store from './app/store'
import theme from './app/theme'

const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'))

initSentry()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
