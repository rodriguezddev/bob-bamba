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
import carrierServiceReducer from './slices/carrierService/carrierServiceSlice'
import errorReducer from './slices/error/errorSlice'
import loadingReducer from './slices/loading/loadingSlice'
import partnerReducer from './slices/partner/partnerSlice'
import productReducer from './slices/product/productSlice'
import subscriptionsReducer from './slices/subscriptions/subscriptionsSlice'
import userReducer from './slices/user/userSlice'
import { storeQueryErrorLogger } from './slices/middlewares/middlewaresStore'

const reducers = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  category: categoryReducer,
  carrierService: carrierServiceReducer,
  error: errorReducer,
  loading: loadingReducer,
  partner: partnerReducer,
  product: productReducer,
  subscriptions: subscriptionsReducer,
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
  }).concat(storeQueryErrorLogger),
})

export default store
