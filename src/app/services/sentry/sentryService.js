import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const initSentry = () => {
  if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }
}

export const logError = (error, errorInfo = null) => {
  if (process.env.NODE_ENV !== 'development') {
    Sentry.withScope((scope) => {
      errorInfo && scope.setExtras(errorInfo)
      Sentry.captureException(error)
    })
  }
}
