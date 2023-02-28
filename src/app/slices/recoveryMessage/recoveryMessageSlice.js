import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  templates: {},
  message: {
    data: {},
    isSuccess: false,
  },
}

export const getTemplates = createAsyncThunk(
  'recoveryMessage/template',
  async (thunkAPI) => {
    try {
      const response = httpService.get(
        `${apiConstants.ADMIN_URL}/message/templates`,
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
        `${apiConstants.ADMIN_URL}/message/send`,
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

export const { resetRecoveryMessage } = recoveryMessageSlice.actions

export default recoveryMessageSlice.reducer
