import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  subscriptions: {
    data: [],
    meta: {},
  },
  canceledSubscription: {},
  subscriptionActivated: {
    isSuccess: false,
  },
}

export const createSubscription = createAsyncThunk(
  'create/subscriptions',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/subscription/${values.userId}/create`,
        { products: values.products },
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

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
      state.canceledSubscription = {}
      state.subscriptionActivated.isSuccess = false
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createSubscription.fulfilled, (state) => {
      state.subscriptionActivated = { isSuccess: true }
    })
    builder.addCase(cancelSubscription.fulfilled, (state, action) => {
      state.canceledSubscription = { ...action.payload.data, isSuccess: true }
    })
  },
})

export const subscription = (state) => state.subscriptions

export const { resetSubscription } = subscriptionsSlice.actions

export default subscriptionsSlice.reducer
