import { isRejectedWithValue } from '@reduxjs/toolkit'
import { reset } from '../auth/authSlice'
import { handleSetError } from '../error/errorSlice'

export const storeQueryErrorLogger = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action?.payload?.status === 401) {
      dispatch(reset())
    }

    dispatch(handleSetError(action?.payload?.errors?.detail))
  }

  return next(action)
}
