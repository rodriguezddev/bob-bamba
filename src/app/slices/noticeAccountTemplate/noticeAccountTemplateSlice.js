import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  noticeAccountTemplates: {
    data: [],
    meta: {},
  },
  noticeAccountTemplate: {
    createTemplate: {
      isSuccess: false,
    },
  },
}

export const getNoticeAccountTemplate = createAsyncThunk(
  'list/NoticeAccountTemplate',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(
          `${apiConstants.ADMIN_URL}/notice-account-templates${params}`,
        )
        : await httpService.get(
          `${apiConstants.ADMIN_URL}/notice-account-templates`,
        )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteNoticeAccountTemplate = createAsyncThunk(
  'delete/noticeAccountTemplate',
  async (values, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: `El template ${values.name}`,
      }
      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/notice-account-template/${values.id}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: values.id }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createNoticeAccountTemplate = createAsyncThunk(
  'create/NoticeAccountTemplate',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/notice-account-template`,
        params,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateNoticeAccountTemplate = createAsyncThunk(
  'update/NoticeAccountTemplate',
  async (values, thunkAPI) => {
    const { data, id } = values
    const messageSuccess = {
      title: '¡Actualizado!',
      subtitle: 'La plantilla se actualizó correctamente',
    }

    try {
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/notice-account-template/${id}`,
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

export const noticeAccountTemplateSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNoticeAccountTemplate: (state) => {
      state.noticeAccountTemplate = initialState.noticeAccountTemplate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNoticeAccountTemplate.fulfilled, (state, action) => {
      state.noticeAccountTemplates = action.payload
    })

    builder.addCase(createNoticeAccountTemplate.fulfilled, (state, action) => {
      state.noticeAccountTemplate = action.payload.data
      state.noticeAccountTemplate.createTemplate = { isSuccess: true }
    })

    builder.addCase(deleteNoticeAccountTemplate.fulfilled, (state, action) => {
      state.noticeAccountTemplates.data = state.noticeAccountTemplates.data.filter(
        (noticeAccountTemplate) => noticeAccountTemplate.id !== action.payload.id,
      )
      state.noticeAccountTemplates.meta.total = state.noticeAccountTemplates.data.length
    })

    builder.addCase(updateNoticeAccountTemplate.fulfilled, (state, action) => {
      const noticeAccountTemplates = state.noticeAccountTemplates.data.filter(
        (noticesAccountTemplate) => noticesAccountTemplate.id !== action.payload.data.id,
      )
      state.noticeAccountTemplates = {
        ...state.noticeAccountTemplates,
        data: [action.payload.data, ...noticeAccountTemplates],
      }
    })
  },
})

export const noticeAccountTemplate = (state) => state.noticeAccountTemplates

export const { resetNoticeAccountTemplate } = noticeAccountTemplateSlice.actions

export default noticeAccountTemplateSlice.reducer
