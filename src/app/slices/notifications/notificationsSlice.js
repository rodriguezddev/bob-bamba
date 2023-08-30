import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  notifications: {
    data: [],
    meta: {},
    deleteNotification: {},
  },
  notification: {},
  eventModels: {},
  templates: {},
}

export const getNotifications = createAsyncThunk(
  'list/notifications',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/notification-configurations${params || ''}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createNotification = createAsyncThunk(
  'notification/create',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/notification-configuration`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteNotification = createAsyncThunk(
  'notifications/delete',
  async (values, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: values.messageSuccess,
      }

      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/notification-configuration/${values.id}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: values.id }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getEventModels = createAsyncThunk(
  'list/eventModels',
  async (thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/notification-configuration/events`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getNotificationTemplates = createAsyncThunk(
  'list/templates',
  async (accountId, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/notice-account/${accountId}/templates`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: (state) => {
      state.notification = {}
    },
    resetTemplates: (state) => {
      state.templates = initialState.templates
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload
    })
    builder.addCase(createNotification.fulfilled, (state, action) => {
      state.notifications = {
        ...state.notifications,
        data: [action.payload.data, ...state.notifications.data],
      }
      state.notification = { ...action.payload.data, isSuccess: true }
    })
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      state.notifications.deleteNotification = {
        ...action.payload.data,
        isSuccess: true,
      }
      state.notifications.data = state.notifications.data.filter(
        (notification) => notification.id !== action.payload.id,
      )
    })
    builder.addCase(getEventModels.fulfilled, (state, action) => {
      state.eventModels = action.payload.data
    })
    builder.addCase(getNotificationTemplates.fulfilled, (state, action) => {
      state.templates = action.payload.data
    })
  },
})

export const notification = (state) => state.notifications

export const { resetNotification, resetTemplates } = notificationSlice.actions

export default notificationSlice.reducer
