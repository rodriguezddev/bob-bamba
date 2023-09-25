import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import {
  Box, Grid, IconButton, Tooltip,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '../../../assets/images/icons/delete.svg'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../../components/tables'
import { MainFilter } from '../../../components/filters'
import { columns } from './components/columns'
import { filters } from './components/filters'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { ActionAlert, Alert } from '../../../components/modals'
import {
  deleteNoticeAccounts,
  getNoticeAccounts,
  updateNoticeAccounts,
} from '../../../slices/noticeAccounts/noticeAccountsSlice'
import NoticeAccountsForm from './components/NoticeAccountForm'
import theme from '../../../theme'

const NoticeAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { config, noticeAccounts } = useSelector((state) => state.noticeAccount)
  const [isShowDialogDelete, setIsShowDialogDelete] = useState(false)
  const [isShowDialogUpdate, setIsShowDialogUpdate] = useState(false)
  const [account, setAccount] = useState({})
  const [updateData, setUpdateData] = useState({})
  const [isShowConfirmDialogUpdate, setIsShowConfirmDialogUpdate] = useState(false)
  const noticeAccountUseForm = useForm({
    defaultValues: {
      name: '',
    },
  })
  const { handleSubmit, watch } = noticeAccountUseForm
  const accountName = watch('accountName') || ''
  const providerName = watch('provider') || ''
  const keyTypes = config[accountName]?.providers[providerName]?.key_types || {}
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleSearch,
    page,
    onPageChange,
  } = useRowsPerPage(getNoticeAccounts, dispatch)

  useEffect(() => {
    dispatch(getNoticeAccounts())
  }, [])

  const handleCreateNoticeAccount = () => {
    navigate('/notice-account/create')
  }

  const handleNavigateToNoticeAccountTemplate = () => {
    navigate('/notice-account/templates')
  }

  const handleShowDialogDeleteNoticeAccount = (accountInfo) => {
    setIsShowDialogDelete(true)
    setAccount(accountInfo)
  }

  const handleDeleteNoticeAccount = () => {
    setIsShowDialogDelete(false)
    dispatch(deleteNoticeAccounts(account))
  }

  const handleShowDialogUpdateNoticeAccount = async (accountInfo) => {
    setIsShowDialogUpdate(true)
    await setAccount(accountInfo)
  }

  const onSubmit = () => {
    dispatch(updateNoticeAccounts({ id: account.id, data: updateData }))
    setIsShowConfirmDialogUpdate(false)
    setIsShowDialogUpdate(false)
  }

  const handleKeysFields = (types, form) => {
    const keys = {}

    Object.keys(types).forEach((key) => {
      if ({}.hasOwnProperty.call(form, key)) {
        keys[key] = form[key]
      }
    })

    return keys
  }

  const handleDataForm = (dataForm) => {
    const data = {
      name: dataForm.name,
      keys: handleKeysFields(keyTypes, dataForm),
      is_enabled: dataForm.isEnabled,
      provider: dataForm.provider,
      notification_type: dataForm.accountName,
    }

    setUpdateData(data)
    setIsShowConfirmDialogUpdate(true)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Cuenta de Notificaciones' />
        <Box display='flex' flexDirection='column'>
          <MainButton
            color='primary'
            data-testid='button-create-notice-account'
            fontSize='0.85rem'
            height='3rem'
            onClick={handleCreateNoticeAccount}
            radius='0.62rem'
            width='15rem'
          >
            Crear cuenta de notificaciones
          </MainButton>
          <Box my={2}>
            <MainButton
              background={theme.palette.background.blueLight}
              color='primary'
              data-testid='button-redirect-noticeAccount-template'
              fontSize='1rem'
              height='3rem'
              onClick={handleNavigateToNoticeAccountTemplate}
              radius='0.62rem'
              type='secondary'
              width='15rem'
            >
              Plantillas de las cuentas
            </MainButton>
          </Box>
        </Box>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={noticeAccounts?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {noticeAccounts?.data?.map((noticeAccount) => (
          <TableRow key={noticeAccount?.id}>
            <TableCell align='left'>{noticeAccount?.name}</TableCell>
            <TableCell align='left'>
              {noticeAccount?.notification_type}
            </TableCell>
            <TableCell align='left'>{noticeAccount?.provider}</TableCell>
            <TableCell align='center'>
              {noticeAccount?.is_enabled ? 'Si' : 'No'}
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
                  <Tooltip title='Editar cuenta de notificación'>
                    <IconButton
                      color='primary'
                      onClick={() => handleShowDialogUpdateNoticeAccount(noticeAccount)}
                      sx={{ padding: 0 }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title='Eliminar cuenta de notificación'>
                    <IconButton
                      onClick={() => handleShowDialogDeleteNoticeAccount(noticeAccount)}
                      sx={{ padding: 0 }}
                    >
                      <img
                        alt='delete'
                        height={20}
                        src={DeleteIcon}
                        width={20}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {isShowDialogDelete && (
        <Alert
          actionButton={handleDeleteNoticeAccount}
          alertContentText='La información se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres eliminar a ${account?.name}?`}
          setIsOpen={setIsShowDialogDelete}
          isShowPrimaryButton
          isOpen={isShowDialogDelete}
        />
      )}
      {isShowDialogUpdate && (
        <ActionAlert
          actionAlertContentText={`Se actualizará la cuenta de ${account?.name}`}
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar Cuenta de notificación'
          isOpen={isShowDialogUpdate}
          isShowPrimaryButton
          onClick={handleSubmit(handleDataForm)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowDialogUpdate}
        >
          <NoticeAccountsForm
            account={account}
            noticeAccountUseForm={noticeAccountUseForm}
          />
        </ActionAlert>
      )}
      {isShowConfirmDialogUpdate && (
        <Alert
          actionButton={onSubmit}
          alertContentText='La información se actualizará con los nuevos valores'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres actualizar la cuenta ${account?.name}?`}
          isShowPrimaryButton
          isOpen={isShowConfirmDialogUpdate}
          primaryButtonTextAlert='Actualizar'
          setIsOpen={setIsShowConfirmDialogUpdate}
        />
      )}
    </Box>
  )
}

export default NoticeAccount
