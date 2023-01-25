import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  users: {
    data: [],
    meta: {},
    createUsers: {},
  },
  user: {},
}

export const getUsers = createAsyncThunk(
  'list/users',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(`${apiConstants.ADMIN_URL}/users${params}`)
        : await httpService.get(`${apiConstants.ADMIN_URL}/users`)

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getUser = createAsyncThunk(
  'user/details',
  async (userId, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/user/${userId}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createUsers = createAsyncThunk(
  'create/users',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/users/batch-create`,
        params,
        true,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const userSlice = createSlice({
  name: 'getUsers',
  initialState,
  reducers: {
    resetCreateUsers(state) {
      state.users.createUsers = {}
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.data
    })
    builder.addCase(createUsers.fulfilled, (state, action) => {
      state.users.createUsers = { ...action.payload.data, isSuccess: true }
    })
  },
})

export const user = (state) => state.users

export const { resetCreateUsers } = userSlice.actions

export default userSlice.reducer
