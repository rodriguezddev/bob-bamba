import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { createSubscription } from '../subscriptions/subscriptionsSlice'

const initialState = {
  products: {
    data: [],
    meta: {},
  },
  product: {},
  productsNotActive: {
    data: [],
  },
  productsByPartners: {
    data: [],
    meta: {},
  },
  productDetails: {},
}

export const getProducts = createAsyncThunk(
  'list/products',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/products${params || ''}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getProductDetails = createAsyncThunk(
  'list/productDetails',
  async (productId, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/product/${productId}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getProductsByPartners = createAsyncThunk(
  'list/productsByPartner',
  async (params, thunkAPI) => {
    try {
      const response = params.limit
        ? await httpService.get(
          `${apiConstants.ADMIN_URL}/products?partner=${params.partner}${params.limit}`,
        )
        : await httpService.get(
          `${apiConstants.ADMIN_URL}/products?partner=${params.partner}`,
        )

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
    resetProductDetails: (state) => {
      state.productDetails = {}
    },
    resetProductsByPartners: (state) => {
      state.productsByPartners = initialState.productsByPartners
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload.data
    })
    builder.addCase(getProductsNotActive.fulfilled, (state, action) => {
      state.productsNotActive = action.payload
    })
    builder.addCase(getProductsByPartners.fulfilled, (state, action) => {
      state.productsByPartners = action.payload
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = {
        ...state.products,
        data: [action.payload.data, ...state.products.data],
      }
      state.product = action.payload.data
    })
    builder.addCase(createSubscription.fulfilled, (state, action) => {
      const updatedProductsNotActive = state.productsNotActive.data.filter(
        (product) => !action.payload.data.products.some(
          (item) => item.sku === product.sku,
        ),
      )

      state.productsNotActive.data = updatedProductsNotActive
    })
  },
})

export const product = (state) => state.products

export const { resetProduct, resetProductDetails, resetProductsByPartners } = productSlice.actions

export default productSlice.reducer
