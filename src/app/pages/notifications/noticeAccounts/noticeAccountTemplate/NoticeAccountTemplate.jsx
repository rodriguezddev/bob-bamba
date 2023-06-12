import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Grid,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useForm } from 'react-hook-form'
import { BackButton, MainButton } from '../../../../components/buttons'
import { GeneralTitle } from '../../../../components/texts'
import { MainFilter } from '../../../../components/filters'
import { GeneralTable } from '../../../../components/tables'
import {
  deleteNoticeAccountTemplate,
  getNoticeAccountTemplate,
  updateNoticeAccountTemplate,
} from '../../../../slices/noticeAccountTemplate/noticeAccountTemplateSlice'
import useRowsPerPage from '../../../../hooks/useRowsPerPage'
import { filters } from './components/filters'
import { columns } from './components/columns'
import { ActionAlert, Alert } from '../../../../components/modals'
import DeleteIcon from '../../../../assets/images/icons/delete.svg'
import FormNoticeAccountTemplate from './components/FormNoticeAccountTemplate'

const NoticeAccountTemplate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { noticeAccountTemplates } = useSelector(
    (state) => state.noticeAccountTemplate,
  )
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(
    getNoticeAccountTemplate,
  )
  const [showDetailsTemplate, setShowDetailsTemplate] = useState(false)
  const [details, setDetails] = useState('')
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [isShowDialogDelete, setIsShowDialogDelete] = useState(false)
  const [isShowDialogUpdate, setIsShowDialogUpdate] = useState(false)
  const [isShowConfirmDialogUpdate, setIsShowConfirmDialogUpdate] = useState(false)
  const [template, setTemplate] = useState({})
  const [updateData, setUpdateData] = useState({})
  const templateForm = useForm({
    defaultValues: {
      name: '',
      content: '',
    },
  })
  const { handleSubmit, reset } = templateForm

  useEffect(() => {
    dispatch(getNoticeAccountTemplate())
  }, [])

  useEffect(() => {
    if (template) {
      reset({
        name: template?.name,
        content: template?.content,
      })
    }
  }, [template])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getNoticeAccountTemplate(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getNoticeAccountTemplate(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )

    setPage(newPage)
  }

  const handleDescription = (description) => {
    setDetails(description)
    setShowDetailsTemplate(!showDetailsTemplate)
  }

  const handleShowDialogDeleteTemplate = (noticeAccountTemplate) => {
    setIsShowDialogDelete(true)
    setTemplate(noticeAccountTemplate)
  }

  const handleDeleteNoticeAccountTemplate = () => {
    setIsShowDialogDelete(false)
    dispatch(deleteNoticeAccountTemplate(template))
  }

  const handleCreateTemplate = () => {
    navigate('/notice-account/templates/create')
  }

  const handleShowDialogUpdateNoticeAccount = (templateInfo) => {
    setIsShowDialogUpdate(true)
    setTemplate(templateInfo)
  }

  const handleDataForm = (dataForm) => {
    const data = {
      content: dataForm.content,
      name: dataForm.name,
      notice_account_id: dataForm.noticeAccount,
      lang: dataForm.lang,
    }

    setUpdateData(data)
    setIsShowConfirmDialogUpdate(true)
  }

  const onSubmit = () => {
    dispatch(updateNoticeAccountTemplate({ id: template.id, data: updateData }))
    setIsShowConfirmDialogUpdate(false)
    setIsShowDialogUpdate(false)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Plantillas de cuentas de notificaciones' />
        <MainButton
          color='primary'
          data-testid='button-create-noticeAccount-template'
          fontSize='0.85rem'
          height='3rem'
          onClick={handleCreateTemplate}
          radius='0.62rem'
          width='15rem'
        >
          Crear plantilla
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={noticeAccountTemplates?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {noticeAccountTemplates?.data?.map((noticeAccountTemplate) => (
          <TableRow key={noticeAccountTemplate?.id}>
            <TableCell align='left'>{noticeAccountTemplate?.name}</TableCell>
            <TableCell align='center'>{noticeAccountTemplate?.lang}</TableCell>
            <TableCell align='center'>
              <Typography
                data-testid={`link-content-template-${noticeAccountTemplate?.name}`}
                onClick={() => handleDescription(noticeAccountTemplate?.content)}
                sx={{ cursor: 'pointer' }}
              >
                <u>Ver Detalle</u>
              </Typography>
            </TableCell>
            <TableCell>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={4}
              >
                <Grid item>
                  <Tooltip title='Editar plantilla'>
                    <IconButton
                      color='primary'
                      onClick={() => handleShowDialogUpdateNoticeAccount(
                        noticeAccountTemplate,
                      )}
                      sx={{ padding: 0 }}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title='Eliminar plantilla de cuenta de notificaciones'>
                    <IconButton
                      onClick={() => handleShowDialogDeleteTemplate(noticeAccountTemplate)}
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
      {showDetailsTemplate && (
        <Alert
          alertTitle='Contenido'
          alertTextButton='Cerrar'
          alertContentText={details}
          isOpen={showDetailsTemplate}
          setIsOpen={setShowDetailsTemplate}
        />
      )}
      {isShowDialogDelete && (
        <Alert
          actionButton={handleDeleteNoticeAccountTemplate}
          alertContentText='La información se eliminará permanentemente'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres eliminar a ${template?.name}?`}
          isOpen={isShowDialogDelete}
          isShowPrimaryButton
          setIsOpen={setIsShowDialogDelete}
        />
      )}
      {isShowDialogUpdate && (
        <ActionAlert
          actionAlertContentText={`Se actualizará la cuenta de ${template?.name}`}
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Actualizar Cuenta de notificación'
          isOpen={isShowDialogUpdate}
          isShowPrimaryButton
          onClick={handleSubmit(handleDataForm)}
          primaryButtonTextAlert='Actualizar'
          setActionsIsOpen={setIsShowDialogUpdate}
        >
          <FormNoticeAccountTemplate templateForm={templateForm} />
        </ActionAlert>
      )}
      {isShowConfirmDialogUpdate && (
        <Alert
          actionButton={onSubmit}
          alertContentText='La información se actualizará con los nuevos valores'
          alertTextButton='Cancelar'
          alertTitle={`¿Quieres actualizar la plantilla ${template?.name}?`}
          isShowPrimaryButton
          isOpen={isShowConfirmDialogUpdate}
          primaryButtonTextAlert='Actualizar'
          setIsOpen={setIsShowConfirmDialogUpdate}
        />
      )}
    </Box>
  )
}

export default NoticeAccountTemplate
