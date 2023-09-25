import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  admins: {
    data: [],
    meta: {},
    createAdmins: {},
    deleteAdmin: {},
  },
  admin: {},
}

export const getAdmins = createAsyncThunk(
  'list/admins',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/admins${params || ''}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createAdmin = createAsyncThunk(
  'admin/createAdmin',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/admin`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const deleteAdmins = createAsyncThunk(
  'delete/admins',
  async (values, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: values.messageSuccess,
      }
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/admin/${values.id}/delete`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: values.id }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateAdmin = createAsyncThunk(
  'update/admin',
  async (values, thunkAPI) => {
    const { data, id } = values
    const messageSuccess = {
      title: '¡Actualizado!',
      subtitle: 'El administrador se actualizó correctamente',
    }

    try {
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/admin/${id}/update`,
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

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdmin: (state) => {
      state.admin = {}
    },
    resetDeleteAdmin(state) {
      state.admins.deleteAdmin = {}
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.admins = action.payload
    })

    builder.addCase(deleteAdmins.fulfilled, (state, action) => {
      state.admins.deleteAdmin = { ...action.payload.data, isSuccess: true }
      state.admins.data = state.admins.data.filter(
        (admin) => admin.id !== action.payload.id,
      )
    })

    builder.addCase(createAdmin.fulfilled, (state, action) => {
      state.admins = {
        ...state.admins,
        data: [action.payload.data, ...state.admins.data],
      }
      state.admin = action.payload.data
    })

    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      const admins = state.admins.data.filter(
        (admin) => admin.id !== action.payload.data.id,
      )
      state.admins = {
        ...state.admins,
        data: [action.payload.data, ...admins],
      }
    })
  },
})

export const admin = (state) => state.admins

export const { resetAdmin } = adminSlice.actions
export const { resetDeleteAdmin } = adminSlice.actions

export default adminSlice.reducer
