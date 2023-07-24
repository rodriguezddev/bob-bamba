import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  carrierServices: {
    data: [],
    meta: {},
  },
  carrierService: {},
  carriers: {
    data: [],
    meta: {},
  },
  carrier: {},
}

export const getCarrierServices = createAsyncThunk(
  'list/carrierServices',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(
          `${apiConstants.ADMIN_URL}/carrier-services${params}`,
        )
        : await httpService.get(`${apiConstants.ADMIN_URL}/carrier-services`)
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createCarrierService = createAsyncThunk(
  'create/createCarrierService',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/carrier-services`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateCarrierService = createAsyncThunk(
  'update/createCarrierService',
  async (values, thunkAPI) => {
    const { data } = values
    try {
      const messageSuccess = {
        title: '¡Actualización exitosa!',
        subtitle: 'Se actualizo el carrier service',
      }
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/carrier-services/${values.carrierServiceId}`,
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

export const getCarriers = createAsyncThunk(
  'list/carrier',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(`${apiConstants.ADMIN_URL}/carriers${params}`)
        : await httpService.get(`${apiConstants.ADMIN_URL}/carriers`)
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createCarrier = createAsyncThunk(
  'create/createCarrier',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/carrier`,
        values,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateCarrier = createAsyncThunk(
  'update/updateCarrier',
  async (values, thunkAPI) => {
    try {
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/carrier/${values.id}`,
        values,
      )
      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const carrierSlice = createSlice({
  name: 'carrier',
  initialState,
  reducers: {
    resetCarrierService: (state) => {
      state.carrierService = {}
    },
    resetCarrier: (state) => {
      state.carrier = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarrierServices.fulfilled, (state, action) => {
      state.carrierServices = action.payload
    })
    builder.addCase(createCarrierService.fulfilled, (state, action) => {
      state.carrierServices = {
        ...state.carrierServices,
        data: [action.payload.data, ...state.carrierServices.data],
      }

      state.carrierService = action.payload.data
    })
    builder.addCase(updateCarrierService.fulfilled, (state, action) => {
      const carrierServices = state.carrierServices.data.filter(
        (carrierService) => carrierService.id !== action.payload.data.id,
      )
      state.carrierServices = {
        ...state.carrierServices,
        data: [action.payload.data, ...carrierServices],
      }

      state.carrierService = action.payload.data
    })
    builder.addCase(getCarriers.fulfilled, (state, action) => {
      state.carriers = action.payload
    })
    builder.addCase(createCarrier.fulfilled, (state, action) => {
      state.carriers = {
        ...state.carriers,
        data: [action.payload.data, ...state.carriers.data],
      }

      state.carrier = action.payload.data
    })
    builder.addCase(updateCarrier.fulfilled, (state, action) => {
      const carriers = state.carriers.data.filter(
        (carrier) => carrier.id !== action.payload.data.id,
      )
      state.carriers = {
        ...state.carriers,
        data: [action.payload.data, ...carriers],
      }

      state.carrier = action.payload.data
    })
  },
})

export const carrier = (state) => state.carriers
export const { resetCarrierService, resetCarrier } = carrierSlice.actions

export default carrierSlice.reducer
