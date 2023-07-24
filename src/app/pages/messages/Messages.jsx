import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Grid, Tooltip, IconButton, Typography,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '../../assets/images/icons/delete.svg'
import { GeneralTitle } from '../../components/texts'
import { MainButton } from '../../components/buttons'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import { getMessages } from '../../slices/messages/messageSlice'
import { Alert } from '../../components/modals'
import { getMessageKey } from '../../utils/UtilsTranslate'
import ActionsMessage from './components/ActionsMessage/ActionsMessage'

const Message = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { messages } = useSelector((state) => state.message)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [isShowDeleteAlert, setIsShowDeleteAlert] = useState(false)
  const [showDetailsMessage, setShowDetailsMessage] = useState(false)
  const [isShowUpdateAlert, setIsShowUpdateAlert] = useState(false)
  const [details, setDetails] = useState({})
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getMessages)

  useEffect(() => {
    dispatch(getMessages())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getMessages(path))
  }

  const navigateToCreateWelcomeMessage = () => {
    navigate('/messages/create')
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getMessages(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )
    setPage(newPage)
  }

  const handleActionsMessage = (messageData, value = 'delete') => {
    setDetails(messageData)
    if (value === 'update') {
      setIsShowUpdateAlert(true)
      return
    }

    setIsShowDeleteAlert(true)
  }

  const handleDescription = (messageData) => {
    setShowDetailsMessage(!showDetailsMessage)
    setDetails(messageData)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Gestor de mensajes' />
        <MainButton
          color='primary'
          data-testid='button-create-welcome-message'
          fontSize='0.85rem'
          height='3rem'
          onClick={navigateToCreateWelcomeMessage}
          radius='0.62rem'
          width='15rem'
        >
          Crear mensaje
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={messages?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {messages?.data?.map((messageInfo) => (
          <TableRow key={messageInfo.id}>
            <TableCell align='center'>
              {getMessageKey(messageInfo?.message_key)}
            </TableCell>
            <TableCell align='center' sx={{ width: '20rem' }}>
              {messageInfo?.partner?.name}
            </TableCell>
            <TableCell align='center'>
              <Typography
                onClick={() => handleDescription(messageInfo)}
                sx={{ cursor: 'pointer' }}
              >
                <u>Ver Detalle</u>
              </Typography>
            </TableCell>
            <TableCell align='center'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={1}
              >
                <Grid item>
                  <Tooltip title='Eliminar mensaje'>
                    <IconButton
                      onClick={() => handleActionsMessage(messageInfo)}
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
                <Grid
                  item
                  onClick={() => handleActionsMessage(messageInfo, 'update')}
                >
                  <Tooltip title='Actualizar mensaje'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <BorderColorIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      <ActionsMessage
        details={details}
        isShowDeleteAlert={isShowDeleteAlert}
        isShowUpdateAlert={isShowUpdateAlert}
        setIsShowDeleteAlert={setIsShowDeleteAlert}
        setIsShowUpdateAlert={setIsShowUpdateAlert}
      />
      {showDetailsMessage && (
        <Alert
          alertTitle='Descripción'
          alertTextButton='Cerrar'
          alertContentText={details.message}
          isOpen={showDetailsMessage}
          setIsOpen={setShowDetailsMessage}
        />
      )}
    </Box>
  )
}

export default Message
