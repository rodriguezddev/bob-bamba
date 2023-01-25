import { createSlice } from '@reduxjs/toolkit'
import { errorsConstants } from '../constants/errorsConstants'

const initialState = {
  isError: false,
  message: '',
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    handleSetError: (state, action) => {
      state.isError = true
      state.message = action.payload || errorsConstants.default
    },
    handleHideError: (state) => {
      state.isError = false
      state.message = ''
    },
  },
})

export const error = (state) => state.error

export const { handleSetError, handleHideError } = errorSlice.actions

export default errorSlice.reducer
