import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  messages: {
    data: [],
    meta: {},
  },
  message: {
    createMessage: {
      isSuccess: false,
    },
  },
}

export const getMessages = createAsyncThunk(
  'list/message',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/configurable-messages${params || ''}`,
      )
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createMessage = createAsyncThunk(
  'campaigns/create',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/configurable-message`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateMessage = createAsyncThunk(
  'update/updateCarrier',
  async (values, thunkAPI) => {
    const { data } = values
    try {
      const messageSuccess = {
        title: '¡Actualización exitosa!',
        subtitle: 'Se actualizo la campaña',
      }
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/configurable-message/${values.messageId}`,
        data,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteMessage = createAsyncThunk(
  'delete/message',
  async (params, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: 'El mensaje se ha eliminado',
      }
      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/configurable-message/${params}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: params }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = initialState.message
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload
    })
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.messages = {
        ...state.messages,
        data: [action.payload.data, ...state.messages.data],
      }

      state.message = {
        ...action.payload.data,
        createMessage: { isSuccess: true },
      }
    })
    builder.addCase(updateMessage.fulfilled, (state, action) => {
      const messages = state.messages.data.filter(
        (message) => message.id !== action.payload.data.id,
      )
      state.messages = {
        ...state.messages,
        data: [action.payload.data, ...messages],
      }

      state.message = action.payload.data
    })
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.messages.data = state.messages.data.filter(
        (message) => message.id !== action.payload.id,
      )
    })
  },
})

export const message = (state) => state.messages
export const { resetMessage } = messageSlice.actions

export default messageSlice.reducer
