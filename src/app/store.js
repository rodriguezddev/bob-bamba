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
import errorReducer from './slices/error/errorSlice'
import loadingReducer from './slices/loading/loadingSlice'
import partnerReducer from './slices/partner/partnerSlice'
import productReducer from './slices/product/productSlice'
import subscriptionsReducer from './slices/subscriptions/subscriptionsSlice'
import userReducer from './slices/user/userSlice'
import recoveryMessageReducer from './slices/recoveryMessage/recoveryMessageSlice'
import { storeQueryLogger } from './slices/middlewares/middlewaresStore'

const reducers = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  category: categoryReducer,
  carrier: carrierReducer,
  error: errorReducer,
  loading: loadingReducer,
  partner: partnerReducer,
  product: productReducer,
  recoveryMessage: recoveryMessageReducer,
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
  }).concat(storeQueryLogger),
})

export default store
