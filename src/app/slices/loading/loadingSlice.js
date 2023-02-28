import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    handleLoading: (state) => {
      state.isLoading = true
    },
    handleNotLoading: (state) => {
      state.isLoading = false
    },
  },
})

export const loading = (state) => state.loading

export const { handleLoading, handleNotLoading } = loadingSlice.actions

export default loadingSlice.reducer
