import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import httpService from '../../services/api_services/HttpService'
import { apiConstants } from '../constants/apiConstants'

const initialState = {
  campaigns: {
    data: [],
    meta: {},
    deleteCampaign: {},
  },
  campaign: {},
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
      const response = await httpService.delete(
        `${apiConstants.ADMIN_URL}/newsletter-message/${params}`,
      )

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
      const response = await httpService.patch(
        `${apiConstants.ADMIN_URL}/newsletter-message/${values.campaignId}`,
        data,
      )

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
      const response = await httpService.post(
        `${apiConstants.ADMIN_URL}/newsletter-message/${values.campaignId}/assign-users`,
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

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    resetCampaign: (state) => {
      state.campaign = {}
    },
    resetTemplates: (state) => {
      state.templates = {}
    },
    resetDeleteCampaigns(state) {
      state.campaigns.deleteCampaign = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      state.campaigns = action.payload
    })
    builder.addCase(createCampaign.fulfilled, (state, action) => {
      state.campaigns = {
        ...state.campaigns,
        data: [action.payload.data, ...state.campaigns.data],
      }
      state.campaign = action.payload.data
    })
    builder.addCase(deleteCampaign.fulfilled, (state, action) => {
      state.campaigns.deleteCampaign = {
        ...action.payload.data,
        isSuccess: true,
      }
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
      const campaigns = state.campaigns.data.filter(
        (campaign) => campaign.id !== action.payload.data.id,
      )
      state.campaigns = {
        ...state.campaigns,
        data: [action.payload.data, ...campaigns],
      }

      state.campaign = action.payload.data
    })
  },
})

export const campaign = (state) => state.campaigns

export const { resetCampaign, resetTemplates, resetDeleteCampaigns } = campaignSlice.actions

export default campaignSlice.reducer
