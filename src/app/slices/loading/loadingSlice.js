import { createSlice } from '@reduxjs/toolkit'
import { createAdmin, deleteAdmins, getAdmins } from '../adminUsers/adminSlice'
import { login } from '../auth/authSlice'
import {
  assignProducts,
  createPartner,
  createSubscriptionBatch,
  getPartners,
} from '../partner/partnerSlice'
import { createProduct, getProducts } from '../product/productSlice'
import { cancelSubscription } from '../subscriptions/subscriptionsSlice'
import { createUsers, getUser, getUsers } from '../user/userSlice'

const initialState = {
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    handleLoading: (state) => {
      state.isLoading = true
    },
    handleNotLoading: (state) => {
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loading auth
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading user
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getUsers.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUsers.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createUsers.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading subscriptions
      .addCase(cancelSubscription.pending, (state) => {
        state.isLoading = true
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(cancelSubscription.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading partner
      .addCase(getPartners.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPartners.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getPartners.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading admin
      .addCase(getAdmins.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdmins.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getAdmins.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createAdmin.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading delete admin
      .addCase(deleteAdmins.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAdmins.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(deleteAdmins.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading create partner
      .addCase(createPartner.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPartner.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createPartner.rejected, (state) => {
        state.isLoading = false
      })
      // handle loading assign product to partner
      .addCase(assignProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(assignProducts.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(assignProducts.rejected, (state) => {
        state.isLoading = false
      })
      // handle loading create subscription from partner
      .addCase(createSubscriptionBatch.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSubscriptionBatch.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createSubscriptionBatch.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading get product
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false
      })
      // Handle loading create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const loading = (state) => state.loading

export const { handleLoading, handleNotLoading } = loadingSlice.actions

export default loadingSlice.reducer
