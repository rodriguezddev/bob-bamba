import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  partners: {
    data: [],
    meta: {},
    products: {},
  },
  partner: {},
  resultSubscriptionFile: {
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
      const response = params
        ? await httpService.get(`${apiConstants.ADMIN_URL}/partners${params}`)
        : await httpService.get(`${apiConstants.ADMIN_URL}/partners`)

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
  },
  extraReducers: (builder) => {
    builder.addCase(getPartners.fulfilled, (state, action) => {
      state.partners = action.payload
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
    builder.addCase(createSubscriptionBatch.fulfilled, (state, action) => {
      state.resultSubscriptionFile = {
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
  },
})

export const partner = (state) => state.partners

export const {
  handleSubscriptionIsSuccess,
  resetPartner,
  resetsAssignProductsIsSuccess,
  resetResultSubscriptionFile,
  resetUsersBatch,
} = partnerSlice.actions

export default partnerSlice.reducer
