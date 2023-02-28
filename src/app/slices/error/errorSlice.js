import { createSlice } from '@reduxjs/toolkit'
import { handleErrorMessage } from '../../utils/UtilsTranslate'
import { errorsConstants } from '../constants/errorsConstants'

const initialState = {
  codeError: null,
  isError: false,
  message: '',
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    handleSetError: (state, action) => {
      state.codeError = action.payload?.code || null
      state.isError = true
      state.message = handleErrorMessage(action.payload?.errors) || errorsConstants.default
    },
    handleHideError: (state) => {
      state.codeError = null
      state.isError = false
      state.message = ''
    },
  },
})

export const error = (state) => state.error

export const { handleSetError, handleHideError } = errorSlice.actions

export default errorSlice.reducer
