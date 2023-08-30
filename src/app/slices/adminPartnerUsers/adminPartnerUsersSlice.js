import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  adminPartnerUsers: {
    data: [],
    meta: {},
  },
  adminPartnerUser: {
    isSuccess: false,
  },
}

export const getAdminsPartnerUsers = createAsyncThunk(
  'list/adminsPartnerUsers',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/admin-partner-users${params || ''}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createAdminsPartnerUsers = createAsyncThunk(
  'adminsPartnerUsers/createAdminsPartnerUsers',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/admin-partner-user`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const adminPartnerUsersSlice = createSlice({
  name: 'adminPartnerUsers',
  initialState,
  reducers: {
    resetAdminPartnerUsers: (state) => {
      state.adminPartnerUser = initialState.adminPartnerUser
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAdminsPartnerUsers.fulfilled, (state, action) => {
      state.adminPartnerUsers = action.payload
    })

    builder.addCase(createAdminsPartnerUsers.fulfilled, (state, action) => {
      state.adminPartnerUsers = {
        ...state.adminPartnerUsers,
        data: [action.payload.data, ...state.adminPartnerUsers.data],
      }
      state.adminPartnerUser = { ...action.payload.data, isSuccess: true }
    })
  },
})

export const adminPartnerUsers = (state) => state.adminPartnerUsers

export const { resetAdminPartnerUsers } = adminPartnerUsersSlice.actions

export default adminPartnerUsersSlice.reducer
