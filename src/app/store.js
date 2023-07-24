import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import adminReducer from './slices/adminUsers/adminSlice'
import authReducer from './slices/auth/authSlice'
import categoryReducer from './slices/category/categorySlice'
import carrierReducer from './slices/carriers/carrierSlice'
import campaignsReducer from './slices/campaigns/campaignSlice'
import errorReducer from './slices/error/errorSlice'
import loadingReducer from './slices/loading/loadingSlice'
import messageReducer from './slices/messages/messageSlice'
import notificationReducer from './slices/notifications/notificationsSlice'
import noticeAccountsReducer from './slices/noticeAccounts/noticeAccountsSlice'
import noticeAccountTemplateReducer from './slices/noticeAccountTemplate/noticeAccountTemplateSlice'
import partnerReducer from './slices/partner/partnerSlice'
import productReducer from './slices/product/productSlice'
import subscriptionsReducer from './slices/subscriptions/subscriptionsSlice'
import userReducer from './slices/user/userSlice'
import recoveryMessageReducer from './slices/recoveryMessage/recoveryMessageSlice'
import successMessageReducer from './slices/successMessage/successMessageSlice'
import { storeQueryLogger } from './slices/middlewares/middlewaresStore'

const reducers = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  category: categoryReducer,
  carrier: carrierReducer,
  campaign: campaignsReducer,
  error: errorReducer,
  loading: loadingReducer,
  message: messageReducer,
  notification: notificationReducer,
  noticeAccount: noticeAccountsReducer,
  noticeAccountTemplate: noticeAccountTemplateReducer,
  partner: partnerReducer,
  product: productReducer,
  recoveryMessage: recoveryMessageReducer,
  subscriptions: subscriptionsReducer,
  successMessage: successMessageReducer,
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(storeQueryLogger),
})

export default store
