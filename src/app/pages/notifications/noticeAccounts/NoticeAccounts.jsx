import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Grid, IconButton, Tooltip,
} from '@mui/material'
import DeleteIcon from '../../../assets/images/icons/delete.svg'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../../components/tables'
import { MainFilter } from '../../../components/filters'
import { columns } from './components/columns'
import { filters } from './components/filters'
import useRowsPerPage from '../../../hooks/useRowsPerPage'
import { Alert } from '../../../components/modals'
import {
  deleteNoticeAccounts,
  getNoticeAccounts,
} from '../../../slices/noticeAccounts/noticeAccountsSlice'

const NoticeAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { noticeAccounts } = useSelector((state) => state.noticeAccount)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [isShowDialogDelete, setIsShowDialogDelete] = useState(false)
  const [account, setAccount] = useState({})
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getNoticeAccounts)

  useEffect(() => {
    dispatch(getNoticeAccounts())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getNoticeAccounts(path))
  }

  const handleCreateNoticeAccount = () => {
    navigate('/notice-account/create')
  }

  const handleShowDialogDeleteNoticeAccount = (accountInfo) => {
    setIsShowDialogDelete(true)
    setAccount(accountInfo)
  }

  const handleDeleteNoticeAccount = () => {
    setIsShowDialogDelete(false)
    dispatch(deleteNoticeAccounts(account))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getNoticeAccounts(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )

    setPage(newPage)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Cuenta de Notificaciones' />
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
                  <Tooltip title='Eliminar campaña'>
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
    </Box>
  )
}

export default NoticeAccount
