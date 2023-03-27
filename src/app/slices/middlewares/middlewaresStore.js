import { isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit'
import { logError } from '../../services/sentry/sentryService'
import { reset } from '../auth/authSlice'
import { handleSetError } from '../error/errorSlice'
import { handleLoading, handleNotLoading } from '../loading/loadingSlice'

export const storeQueryLogger = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const sentryErrorMessage = new Error(
      `${action?.payload?.status} ${action?.type}`,
    )

    if (action?.payload?.status === 401) {
      dispatch(reset())
    }

    logError(sentryErrorMessage, action?.payload)

    dispatch(handleNotLoading())
    dispatch(handleSetError(action?.payload))
  }

  if (isPending(action)) {
    dispatch(handleLoading())
  }

  if (isFulfilled(action)) {
    dispatch(handleNotLoading())
  }
  return next(action)
}
