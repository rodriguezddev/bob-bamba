import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, IconButton } from '@mui/material'
import { Alert } from '../../components/modals'
import { Avatar } from '../../components/avatar'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import DeleteIcon from '../../assets/images/icons/delete.svg'
import {
  deleteAdmins,
  getAdmins,
  resetDeleteAdmin,
} from '../../slices/adminUsers/adminSlice'
import { columns } from './components/columns'
import { GeneralTitle } from '../../components/texts'
import { MainButton } from '../../components/buttons'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'

const AdminUsers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { admins } = useSelector((state) => state.admin)
  const [adminAlert, setAdminAlert] = useState({})
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    dispatch(getAdmins())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getAdmins(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(getAdmins(`${search ? `${search}&` : '?'}page=${newPage + 1}`))
    setPage(newPage)
  }

  const handleCreateUserAdmin = () => {
    navigate('/admin-users/create')
  }

  const setAdmin = (id) => {
    dispatch(deleteAdmins(id))
    setShowAlert(false)
  }

  const handleAlertAction = () => {
    setAdmin(adminAlert.id)
  }

  const handleDeleteAdminUser = (admin) => {
    setAdminAlert(admin)
    setShowAlert(true)
  }

  useEffect(() => {
    if (admins.deleteAdmin?.isSuccess) {
      setShowSuccessAlert(admins.deleteAdmin?.isSuccess)
      dispatch(resetDeleteAdmin())
    }
  }, [admins])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Usuarios administradores' />
        <MainButton
          color='primary'
          data-testid='button-create-admin-user'
          fontSize='1rem'
          height='3.75rem'
          onClick={handleCreateUserAdmin}
          radius='0.62rem'
          width='18rem'
        >
          Crear usuario administrador
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={admins?.meta?.total ?? 0}
        onPageChange={onPageChange}
        page={page}
        rowsPerPageOptions={[10]}
        SelectProps={{
          native: true,
        }}
      >
        {admins?.data?.map((userAdmin) => (
          <TableRow key={userAdmin.id}>
            <TableCell align='center'>
              <Box display='flex' sx={{ justifyContent: 'left' }}>
                <Avatar gender={userAdmin.gender} />
                <Box mt={2} ml='1.5rem'>
                  {userAdmin.name}
                  {' '}
                  {userAdmin.lastname}
                </Box>
              </Box>
            </TableCell>
            <TableCell align='center'>{userAdmin.email}</TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item>
                  <IconButton onClick={() => handleDeleteAdminUser(userAdmin)}>
                    <img src={DeleteIcon} alt='Editar' width={24} height={24} />
                  </IconButton>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {showAlert && (
        <Alert
          actionButton={handleAlertAction}
          alertContentText='La información se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres eliminar a ${adminAlert.name} ${adminAlert.lastname}?`}
          setIsOpen={setShowAlert}
          isShowPrimaryButton
          isOpen={showAlert}
        />
      )}
      {showSuccessAlert && (
        <Alert
          alertContentText={`El administrador ${adminAlert.name} ${adminAlert.lastname} se ha eliminado`}
          alertTextButton='Cerrar'
          alertTitle='¡Eliminado!'
          isOpen={showSuccessAlert}
          setIsOpen={setShowSuccessAlert}
        />
      )}
    </Box>
  )
}

export default AdminUsers
