import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  carrierServices: {
    data: [],
    meta: {},
  },
}

export const getCarrierServices = createAsyncThunk(
  'list/carrierServices',
  async (thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/carrier-services`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const carrierServiceSlice = createSlice({
  name: 'carrierServices',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCarrierServices.fulfilled, (state, action) => {
      state.carrierServices = action.payload
    })
  },
})

export const carrierService = (state) => state.carrierServices

export default carrierServiceSlice.reducer
