import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Grid, IconButton } from '@mui/material'
import DeleteIcon from '../../assets/images/icons/delete.svg'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { MainButton } from '../../components/buttons'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import {
  deleteNotification,
  getNotifications,
} from '../../slices/notifications/notificationsSlice'
import { Alert } from '../../components/modals'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import theme from '../../theme'

const Notifications = () => {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { notifications } = useSelector((state) => state.notification)
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getNotifications)
  const [notificationDelete, setNotificationDelete] = useState({})
  const [isShowAssignProductsAlert, setIsShowAssignProductsAlert] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    dispatch(getNotifications())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getNotifications(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getNotifications(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )
    setPage(newPage)
  }

  const navigateToCreateUser = () => {
    navigate('/notifications/create')
  }

  const handleShowActionAlert = () => {
    setIsShowAssignProductsAlert(!isShowAssignProductsAlert)
  }

  const handleDeleteNotification = (notificationData) => {
    setNotificationDelete(notificationData)
    setShowAlert(true)
  }

  const setDeleteNortification = (id) => {
    const values = {
      id,
      messageSuccess: `La notificación ${notificationDelete.name} se ha eliminado`,
    }
    dispatch(deleteNotification(values))
    setShowAlert(false)
  }

  const handleAlertAction = () => {
    setDeleteNortification(notificationDelete.id)
    setShowAlert(false)
  }

  const handleNavigateToNoticeAccount = () => {
    navigate('/notice-account')
  }

  useEffect(() => {
    if (notifications && notifications.products?.isSuccess) {
      handleShowActionAlert()
    }
  }, [notifications.products])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Notificaciones' />
        <Box display='flex' flexDirection='column'>
          <MainButton
            color='primary'
            data-testid='button-create-notification'
            fontSize='0.85rem'
            height='3rem'
            onClick={navigateToCreateUser}
            radius='0.62rem'
            width='15rem'
          >
            Crear notificación
          </MainButton>
          <Box my={2}>
            <MainButton
              background={theme.palette.background.blueLight}
              color='primary'
              data-testid='button-redirect-noticeAccount'
              fontSize='1rem'
              height='3rem'
              onClick={handleNavigateToNoticeAccount}
              radius='0.62rem'
              type='secondary'
              width='15rem'
            >
              Cuentas de notificaciones
            </MainButton>
          </Box>
        </Box>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={notifications?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {notifications?.data?.map((notification) => (
          <TableRow key={notification.id}>
            <TableCell align='left'>{notification?.name}</TableCell>
            <TableCell align='left'>{notification?.partner?.name}</TableCell>
            <TableCell align='left'>{notification?.model_type}</TableCell>
            <TableCell align='left'>{notification?.event_type}</TableCell>
            <TableCell align='left'>{notification?.template}</TableCell>
            <TableCell align='left'>{notification?.template_lang}</TableCell>
            <TableCell align='left'>
              {notification?.notice_account?.name}
            </TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item>
                  <IconButton
                    onClick={() => handleDeleteNotification(notification)}
                  >
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
          alertContentText='La notificación se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres eliminar ${notificationDelete.name}?`}
          isShowPrimaryButton
          isOpen={showAlert}
          setIsOpen={setShowAlert}
        />
      )}
      {showSuccessAlert && (
        <Alert
          alertContentText={`La notificación ${notificationDelete.name} se ha eliminado`}
          alertTextButton='Cerrar'
          alertTitle='¡Eliminado!'
          isOpen={showSuccessAlert}
          setIsOpen={setShowSuccessAlert}
        />
      )}
    </Box>
  )
}

export default Notifications
