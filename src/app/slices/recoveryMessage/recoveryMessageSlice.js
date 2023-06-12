import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  message: {
    data: {},
    isSuccess: false,
  },
  templates: {},
}

export const getTemplates = createAsyncThunk(
  'recoveryMessage/template',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/notice-account/${params}/templates`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const sendRecoveryMessage = createAsyncThunk(
  'recoveryMessage/sendMessage',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/user/${values.user}/send-notification`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const recoveryMessageSlice = createSlice({
  name: 'recoveryMessage',
  initialState,
  reducers: {
    resetRecoveryMessage: (state) => {
      state.message = initialState.message
    },
    resetTemplates: (state) => {
      state.templates = initialState.templates
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplates.fulfilled, (state, action) => {
      state.templates = action.payload.data
    })
    builder.addCase(sendRecoveryMessage.fulfilled, (state) => {
      state.message.isSuccess = true
    })
  },
})

export const recoveryMessage = (state) => state.recoveryMessage

export const { resetRecoveryMessage, resetTemplates } = recoveryMessageSlice.actions

export default recoveryMessageSlice.reducer
