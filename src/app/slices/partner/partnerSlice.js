import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  assignedAccount: {},
  partners: {
    data: [],
    meta: {},
    products: {},
  },
  partner: {},
  resultSubscriptionFile: {
    isSuccess: false,
  },
  scope: {},
  usersWithFile: {
    isSuccess: false,
  },
  usersBatch: {
    errors: [],
    isSuccess: false,
    rowsProcessed: 0,
  },
}

export const getPartners = createAsyncThunk(
  'list/partners',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/partners${params || ''}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createPartner = createAsyncThunk(
  'partner/createUser',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/partner`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const assignProducts = createAsyncThunk(
  'partner/assignProducts',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.put(
        `${apiConstants.ADMIN_URL}/partner/${values.partnerId}/products`,
        values.product,
      )
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const assignAccount = createAsyncThunk(
  'partner/assignAccount',
  async (values, thunkAPI) => {
    const { data } = values

    try {
      const messageSuccess = {
        title: '¡Asignada!',
        subtitle: 'La cuenta se ha asignado',
      }

      const response = await httpService.put(
        `${apiConstants.ADMIN_URL}/partner/${values.partnerId}/notice-account`,
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

export const createSubscriptionBatch = createAsyncThunk(
  'partner/subscription',
  async (params, thunkAPI) => {
    const { data } = params
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/subscription/batch`,
        data,
        true,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createUsersWithFile = createAsyncThunk(
  'partner/users',
  async (params, thunkAPI) => {
    const { data } = params
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/users/import`,
        data,
        true,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createUserBatch = createAsyncThunk(
  'partner/userBatch',
  async (params, thunkAPI) => {
    const { data } = params
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/users/batch-create`,
        data,
        true,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updatePartner = createAsyncThunk(
  'update/updatePartner',
  async (values, thunkAPI) => {
    const { data, id } = values
    const messageSuccess = {
      title: '¡Actualizado!',
      subtitle: 'El partner se actualizó correctamente',
    }

    try {
      const response = await httpService.put(
        `${apiConstants.ADMIN_URL}/partner/${id}`,
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

export const getPartner = createAsyncThunk(
  'partner/getPartner',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/partner/${values}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getScope = createAsyncThunk(
  'partner/getScope',
  async (thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/partner/webhook-scopes`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createWebhookPartner = createAsyncThunk(
  'partner/createWebhookPartner',
  async (values, thunkAPI) => {
    const { id, data } = values
    try {
      const messageSuccess = {
        title: 'Creado!',
        subtitle: 'El webhook se agregó correctamente',
      }

      const response = await httpService.put(
        `${apiConstants.ADMIN_URL}/partner/${id}/webhook`,
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

export const createTokenPartner = createAsyncThunk(
  'partner/createTokenPartner',
  async (values, thunkAPI) => {
    const { id, data } = values
    try {
      const messageSuccess = {
        title:
          data.action === 'CREATE'
            ? '¡Token creado correctamente!'
            : '¡Eliminado!',
        ...(data.action === 'DELETE' && {
          subtitle: 'El token se ha eliminado',
        }),
      }

      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/partner/${id}/oauth-token`,
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

export const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    resetPartner: (state) => {
      state.partner = {}
    },
    resetsAssignProductsIsSuccess: (state) => {
      state.partners.products.isSuccess = false
    },
    resetResultSubscriptionFile: (state) => {
      state.resultSubscriptionFile = {}
    },
    handleSubscriptionIsSuccess: (state) => {
      state.resultSubscriptionFile.isSuccess = false
    },
    resetUsersBatch: (state) => {
      state.usersBatch = {
        process: 0,
        isSuccess: false,
      }
    },
    resetUsersWithFile: (state) => {
      state.usersWithFile = initialState.usersWithFile
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPartners.fulfilled, (state, action) => {
      state.partners = action.payload
    })

    builder.addCase(getScope.fulfilled, (state, action) => {
      state.scope = action.payload
    })

    builder.addCase(getPartner.fulfilled, (state, action) => {
      state.partner = action.payload.data
    })

    builder.addCase(createPartner.fulfilled, (state, action) => {
      state.partners = {
        ...state.partners,
        data: [action.payload.data, ...state.partners.data],
      }
      state.partner = action.payload.data
    })

    builder.addCase(assignProducts.fulfilled, (state, action) => {
      state.partners.products = { ...action.payload, isSuccess: true }
    })

    builder.addCase(assignAccount.fulfilled, (state, action) => {
      state.assignedAccount = action.payload
    })

    builder.addCase(createSubscriptionBatch.fulfilled, (state, action) => {
      state.resultSubscriptionFile = {
        ...action.payload.data,
        isSuccess: true,
      }
    })

    builder.addCase(createUsersWithFile.fulfilled, (state, action) => {
      state.usersWithFile = {
        ...action.payload.data,
        isSuccess: true,
      }
    })

    builder.addCase(createUserBatch.fulfilled, (state, action) => {
      state.usersBatch = {
        errors: action.payload.data.errors,
        isSuccess: true,
        rowsProcessed: action.payload.data.total_rows,
      }
    })

    builder.addCase(updatePartner.fulfilled, (state, action) => {
      const partners = state.partners.data.filter(
        (partner) => partner.id !== action.payload.data.id,
      )
      state.partners = {
        ...state.partners,
        data: [action.payload.data, ...partners],
      }
    })

    builder.addCase(createWebhookPartner.fulfilled, (state, action) => {
      const partners = state.partners.data.filter(
        (partner) => partner.id !== action.payload.data.id,
      )
      state.partners = {
        ...state.partners,
        data: [action.payload.data, ...partners],
      }
    })
  },
})

export const partner = (state) => state.partners

export const {
  handleSubscriptionIsSuccess,
  resetPartner,
  resetsAssignProductsIsSuccess,
  resetResultSubscriptionFile,
  resetUsersBatch,
  resetUsersWithFile,
} = partnerSlice.actions

export default partnerSlice.reducer
