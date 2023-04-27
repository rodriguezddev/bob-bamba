import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'

const initialState = {
  user: {},
  loggedIn: false,
}

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const response = await httpService.loginAuth('/oauth/token', data)

    return response
  } catch (error) {
    const message = error
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedIn = true
      state.user.token = action.payload.access_token
    })
  },
})

export const auth = (state) => state.auth

export const { logout } = authSlice.actions

export default authSlice.reducer
