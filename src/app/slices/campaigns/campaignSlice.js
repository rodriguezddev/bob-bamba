import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'
import { handleSetSuccessMessage } from '../successMessage/successMessageSlice'

const initialState = {
  campaigns: {
    data: [],
    meta: {},
  },
  campaign: {},
  isUploadUsersCampaigns: false,
}

export const getCampaigns = createAsyncThunk(
  'list/campaigns',
  async (params, thunkAPI) => {
    try {
      const response = params
        ? await httpService.get(
          `${apiConstants.ADMIN_URL}/newsletter-messages${params}`,
        )
        : await httpService.get(`${apiConstants.ADMIN_URL}/newsletter-messages`)

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const getCampaign = createAsyncThunk(
  'campaign/details',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.get(
        `${apiConstants.ADMIN_URL}/newsletter-message/${params}`,
      )

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const createCampaign = createAsyncThunk(
  'campaigns/create',
  async (params, thunkAPI) => {
    try {
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/newsletter-message`,
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

export const deleteCampaign = createAsyncThunk(
  'delete/campaign',
  async (params, thunkAPI) => {
    try {
      const messageSuccess = {
        title: '¡Eliminado!',
        subtitle: 'La campaña se ha eliminado',
      }
      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/newsletter-message/${params}`,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return { response, id: params }
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const updateCampaign = createAsyncThunk(
  'update/updateCarrier',
  async (values, thunkAPI) => {
    const { data } = values
    try {
      const messageSuccess = {
        title: '¡Actualización exitosa!',
        subtitle: 'Se actualizo la campaña',
      }
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/newsletter-message/${values.campaignId}`,
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

export const assignUsers = createAsyncThunk(
  'assignUsers/campaign',
  async (values, thunkAPI) => {
    const { data } = values
    try {
      const messageSuccess = {
        title: '¡Usuarios cargados!',
        subtitle: 'Los usuarios se han cargado con éxito',
      }

      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/newsletter-message/${values.campaignId}/assign-users`,
        data,
        true,
      )

      thunkAPI.dispatch(handleSetSuccessMessage(messageSuccess))

      return response
    } catch (error) {
      const message = error

      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    resetCampaign: (state) => {
      state.campaign = {}
    },
    resetUploadUsersCampaigns: (state) => {
      state.uploadUsers = false
    },
    resetTemplates: (state) => {
      state.templates = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      state.campaigns = action.payload
    })
    builder.addCase(getCampaign.fulfilled, (state, action) => {
      state.campaign = action.payload.data
    })
    builder.addCase(createCampaign.fulfilled, (state, action) => {
      state.campaigns = {
        ...state.campaigns,
        data: [action.payload.data, ...state.campaigns.data],
      }
      state.campaign = { ...action.payload.data, isSuccess: true }
    })
    builder.addCase(deleteCampaign.fulfilled, (state, action) => {
      state.campaigns.data = state.campaigns.data.filter(
        (campaign) => campaign.id !== action.payload.id,
      )
    })
    builder.addCase(updateCampaign.fulfilled, (state, action) => {
      const campaigns = state.campaigns.data.filter(
        (campaign) => campaign.id !== action.payload.data.id,
      )
      state.campaigns = {
        ...state.campaigns,
        data: [action.payload.data, ...campaigns],
      }

      state.campaign = action.payload.data
    })
    builder.addCase(assignUsers.fulfilled, (state, action) => {
      state.uploadUsers = true
      state.campaign = action.payload.data
    })
  },
})

export const campaign = (state) => state.campaigns

export const {
  resetUploadUsersCampaigns,
  resetCampaign,
  resetTemplates,
  resetDeleteCampaigns,
} = campaignSlice.actions

export default campaignSlice.reducer
