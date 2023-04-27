import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  noticeAccounts: {
    data: [],
    meta: {},
  },
  noticeAccount: {
    isSuccess: false,
  },
  config: {},
}

export const getNoticeAccounts = createAsyncThunk(
  'list/noticeAccounts',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(
          `${apiConstants.ADMIN_URL}/notice-accounts${params}`,
        )
        : await httpService.get(`${apiConstants.ADMIN_URL}/notice-accounts`)
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getNoticeAccountsConfig = createAsyncThunk(
  'noticeAccounts/noticeAccountsConfig',
  async (thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/notice-account/configs`,
      )
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteNoticeAccounts = createAsyncThunk(
  'noticeAccounts/noticeAccountsDelete',
  async (values, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: `La cuenta ${values.name}`,
      }
      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/notice-account/${values.id}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: values.id }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createNoticeAccounts = createAsyncThunk(
  'noticeAccounts/createNoticeAccounts',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/notice-account`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const noticeAccountsSlice = createSlice({
  name: 'noticeAccounts',
  initialState,
  reducers: {
    resetNoticeAccounts: (state) => {
      state.noticeAccount = {}
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getNoticeAccountsConfig.fulfilled, (state, action) => {
      state.config = action.payload.data
    })
    builder.addCase(getNoticeAccounts.fulfilled, (state, action) => {
      state.noticeAccounts = action.payload
    })

    builder.addCase(createNoticeAccounts.fulfilled, (state, action) => {
      state.noticeAccounts = {
        ...state.noticeAccounts,
        data: [action.payload.data, ...state.noticeAccounts.data],
      }
      state.noticeAccount = { ...action.payload.data, isSuccess: true }
    })

    builder.addCase(deleteNoticeAccounts.fulfilled, (state, action) => {
      state.noticeAccounts.data = state.noticeAccounts.data.filter(
        (noticeAccount) => noticeAccount.id !== action.payload.id,
      )
    })
  },
})

export const noticeAccount = (state) => state.noticeAccounts

export const { resetNoticeAccounts } = noticeAccountsSlice.actions

export default noticeAccountsSlice.reducer
