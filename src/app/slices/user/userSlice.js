import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { createSubscription } from '../subscriptions/subscriptionsSlice'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  users: {
    data: [],
    meta: {},
    createUsers: {},
  },
  user: {
    createUser: {
      isSuccess: false,
    },
    subscriptions: [],
  },
}

export const getUsers = createAsyncThunk(
  'list/users',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/users${params || ''}`,
      )

      return { ...response, params }
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

export const createUser = createAsyncThunk(
  'create/user',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/user`,
        params,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const activateUser = createAsyncThunk(
  'activate/user',
  async (userId, thunkAPI) => {
    try {
      const messageSuccess = { title: '¡Usuario activado correctamente!' }

      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/user/${userId}/restore`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deactivateUser = createAsyncThunk(
  'deactivate/user',
  async (userId, thunkAPI) => {
    try {
      const messageSuccess = { title: '¡Usuario desactivado correctamente!' }

      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/user/${userId}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetCreateUsers(state) {
      state.users.createUsers = {}
    },
    resetCreateUser(state) {
      state.user = initialState.user
    },
    resetUserActive(state) {
      state.user.active = true
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
    })

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload.data
    })

    builder.addCase(createSubscription.fulfilled, (state, action) => {
      state.user.subscriptions = [
        ...state.user.subscriptions,
        action.payload.data,
      ]
    })

    builder.addCase(createUsers.fulfilled, (state, action) => {
      state.users.createUsers = { ...action.payload.data, isSuccess: true }
    })

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.data = [...state.users.data, action.payload.data]
      state.user = action.payload.data
      state.user.createUser = { isSuccess: true }
    })

    builder.addCase(deactivateUser.fulfilled, (state, action) => {
      state.user.active = false
      state.users.data = state.users.data.filter(
        (user) => user.id !== action.meta.arg,
      )
      state.users.meta.total -= 1
    })

    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.user.active = true
      state.users.data = state.users.data.filter(
        (user) => user.id !== action.payload.data.id,
      )

      state.users.meta.total += 1
    })
  },
})

export const user = (state) => state.users

export const { resetCreateUsers, resetCreateUser, resetUserActive } = userSlice.actions

export default userSlice.reducer
