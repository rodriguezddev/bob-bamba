import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  products: {
    data: [],
    meta: {},
  },
  product: {},
  productsNotActive: {
    data: [],
  },
}

export const getProducts = createAsyncThunk(
  'list/products',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(`${apiConstants.ADMIN_URL}/products${params}`)
        : await httpService.get(`${apiConstants.ADMIN_URL}/products`)

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getProductsNotActive = createAsyncThunk(
  'list/productsNotActive',
  async (userId, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/products/not-active/${userId}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/product`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(getProductsNotActive.fulfilled, (state, action) => {
      state.productsNotActive = action.payload
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = {
        ...state.products,
        data: [action.payload.data, ...state.products.data],
      }
      state.product = action.payload.data
    })
  },
})

export const product = (state) => state.products

export const { resetProduct } = productSlice.actions

export default productSlice.reducer
