import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'

const initialState = {
  user: {},
  loggedIn: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post('/api/token/create', values)

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post('/api/token/destroy', values)

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loggedIn = false
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedIn = true
      state.user = action.payload.data
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loggedIn = false
      state.user = {}
    })
  },
})

export const auth = (state) => state.auth

export const { reset } = authSlice.actions

export default authSlice.reducer
