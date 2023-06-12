import React from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import CreatePartners from './partners/createPartners'
import Home from './home'
import Login from './login'
import ProtectedRoute from '../auth/ProtectedRoute'
import Users from './users'
import UserDetails from './users/userDetails'
import Partners from './partners'
import AdminUsers from './adminUsers'
import CreateAdminUser from './adminUsers/createAdminUser'
import Products from './products'
import CreateProducts from './products/createProducts'
import CarrierServices from './carriers/carrierServices'
import CreateCarrierServices from './carriers/carrierServices/createCarrierServices'
import Carriers from './carriers/carriers'
import CreateCarriers from './carriers/carriers/createCarriers'
import Campaigns from './campaigns'
import CreateCampaigns from './campaigns/createCampaigns'
import Notifications from './notifications'
import CreateNotification from './notifications/createNotification'
import NoticeAccounts from './notifications/noticeAccounts'
import NoticeAccountTemplate from './notifications/noticeAccounts/noticeAccountTemplate'
import CreateNoticeAccount from './notifications/noticeAccounts/createNoticeAccount'
import CreateNoticeAccountTemplate from './notifications/noticeAccounts/createNoticeAccountTemplate'
import { GlobalSpinner } from '../components/spinners'
import { AlertError, AlertSuccess } from '../components/modals'
import CreateUsers from './users/createUsers'
import CreateUsersInBatch from './partners/createUsersInBatch'

const Routes = () => (
  <>
    <AlertError />
    <AlertSuccess />
    <GlobalSpinner />
    <ReactRoutes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/partners' element={<Partners />} />
        <Route path='/partners/create' element={<CreatePartners />} />
        <Route
          path='/partners/create-users/:id'
          element={<CreateUsersInBatch />}
        />
        <Route path='/users' element={<Users />} />
        <Route path='/users/create' element={<CreateUsers />} />
        <Route path='/users/details/:id' element={<UserDetails />} />
        <Route path='/admin-users' element={<AdminUsers />} />
        <Route path='/admin-users/create' element={<CreateAdminUser />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/create' element={<CreateProducts />} />
        <Route path='/carrier-services' element={<CarrierServices />} />
        <Route
          path='/carrier-services/create'
          element={<CreateCarrierServices />}
        />
        <Route path='/carriers' element={<Carriers />} />
        <Route path='/carriers/create' element={<CreateCarriers />} />
        <Route path='/campaigns' element={<Campaigns />} />
        <Route path='/campaigns/create' element={<CreateCampaigns />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/notifications/create' element={<CreateNotification />} />
        <Route path='/notice-account' element={<NoticeAccounts />} />
        <Route
          path='/notice-account/create'
          element={<CreateNoticeAccount />}
        />
        <Route
          path='/notice-account/templates'
          element={<NoticeAccountTemplate />}
        />
        <Route
          path='/notice-account/templates/create'
          element={<CreateNoticeAccountTemplate />}
        />
      </Route>
    </ReactRoutes>
  </>
)

export default Routes
