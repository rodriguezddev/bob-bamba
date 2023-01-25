import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  subscriptions: {
    data: [],
    meta: {},
  },
  canceledSubscription: {},
}

export const cancelSubscription = createAsyncThunk(
  'cancel/subscriptions',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/subscription/${params}/cancel`,
        true,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const subscriptionsSlice = createSlice({
  name: 'getSubscriptions',
  initialState,
  reducers: {
    resetSubscription(state) {
      state.canceledSubscription.isSuccess = false
    },
  },

  extraReducers: (builder) => {
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.canceledSubscription = { ...action.payload.data, isSuccess: true }
    })
  },
})

export const subscription = (state) => state.subscriptions

export const { resetSubscription } = subscriptionsSlice.actions

export default subscriptionsSlice.reducer
