import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSuccess: false,
  message: {},
}

export const successMessageSlice = createSlice({
  name: 'successMessage',
  initialState,
  reducers: {
    handleSetSuccessMessage: (state, action) => {
      state.isSuccess = true
      state.message = action.payload
    },
    handleHideSuccessMessage: (state) => {
      state.isSuccess = false
      state.message = {}
    },
  },
})

export const successMessage = (state) => state.successMessage

export const { handleSetSuccessMessage, handleHideSuccessMessage } = successMessageSlice.actions

export default successMessageSlice.reducer
