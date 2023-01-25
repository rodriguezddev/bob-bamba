import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes as ReactRoutes, Route } from 'react-router-dom'
import { Alert } from '../components/modals'
import { Spinner } from '../components/spinners'
import { handleHideError } from '../slices/error/errorSlice'
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
import CreateProducts from './products/createProducts/CreateProducts'

const Routes = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.loading)
  const { isError, message } = useSelector((state) => state.error)

  const handleCloseError = () => {
    dispatch(handleHideError())
  }

  return (
    <>
      {isError && (
        <Alert
          alertTitle='Error'
          alertContentText={message}
          alertTextButton='Cerrar'
          errorText
          isOpen={isError}
          setIsOpen={handleCloseError}
        />
      )}
      {isLoading && <Spinner loading={isLoading} />}
      <ReactRoutes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/partners' element={<Partners />} />
          <Route path='/partners/create' element={<CreatePartners />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/details/:id' element={<UserDetails />} />
          <Route path='/admin-users' element={<AdminUsers />} />
          <Route path='/admin-users/create' element={<CreateAdminUser />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/create' element={<CreateProducts />} />
        </Route>
      </ReactRoutes>
    </>
  )
}

export default Routes
