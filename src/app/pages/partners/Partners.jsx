import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, IconButton, Tooltip, Typography,
} from '@mui/material'
import { CSVLink } from 'react-csv'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { ActionAlert, Alert } from '../../components/modals'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import {
  assignProducts,
  getPartners,
  handleSubscriptionIsSuccess,
  resetsAssignProductsIsSuccess,
  resetUsersBatch,
} from '../../slices/partner/partnerSlice'
import {
  getTextErrorUploadFile,
  getTextActionUploadFile,
  getTypePartner,
} from '../../utils/UtilsTranslate'
import { MainButton } from '../../components/buttons'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import ProductContainer from './components/ProductContainer'
import UploadIconPartner from './components/UploadIconPartner/UploadIconPartner'
import { formatDate } from '../../utils/utilsFormat'
import UploadUserBatch from './components/UploadUserBatch/UploadUserBatch'
import ProductsByPartnerContainer from './components/ProductsByPartnerContainer/ProductsByPartnerContainer'

const Partners = () => {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { partners, resultSubscriptionFile, usersBatch } = useSelector(
    (state) => state.partner,
  )
  const [partnerActionAlert, setPartnerActionAlert] = useState({})
  const [partnerInfo, setPartnerInfo] = useState({})
  const [assignedProducts, setAssignedProducts] = useState([])
  const [isShowAssignProductsAlert, setIsShowAssignProductsAlert] = useState(false)
  const [isShowProducts, setIsShowProducts] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [isShowAssignedConfirmationAlert, setIsShowAssignedConfirmationAlert] = useState(false)

  useEffect(() => {
    dispatch(getPartners())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getPartners(path))
  }

  const onPageChange = (event, newPage) => {
    dispatch(getPartners(`${search ? `${search}&` : '?'}page=${newPage + 1}`))
    setPage(newPage)
  }

  const navigateToCreateUser = () => {
    navigate('/partners/create')
  }

  const handleAssignedConfirmationAlert = () => {
    setIsShowAssignedConfirmationAlert(!isShowAssignedConfirmationAlert)
  }

  const handleShowActionAlert = () => {
    setIsShowAssignProductsAlert(!isShowAssignProductsAlert)
  }

  const handlePartner = (partnerId) => {
    setPartnerActionAlert(partnerId)
    handleShowActionAlert()
  }

  const handleProductsAssigned = (partner) => {
    setPartnerInfo(partner)
    setIsShowProducts(true)
  }

  const handleAlertSuccess = () => {
    if (resultSubscriptionFile?.total_successfully_processed === 0) {
      dispatch(handleSubscriptionIsSuccess())
      return
    }

    navigate('/users')
    dispatch(handleSubscriptionIsSuccess())
  }

  const handleUnprocessedUsers = (usersErrors) => usersErrors.map((item) => {
    const { action, sku, user } = item

    return {
      name: user?.name,
      lastName: user?.lastname,
      secondLastname: user?.second_lastname,
      email: user?.email,
      cellphone: user?.cellphone,
      gender: user?.gender,
      birthdate: formatDate(user?.birthdate),
      rfc: user?.tax_id,
      curp: user?.personal_id,
      sku,
      action: getTextActionUploadFile(action),
      error: getTextErrorUploadFile(item.error),
    }
  })

  const handleProductAssigned = () => {
    const body = {
      partnerId: partnerActionAlert.id,
      product: {
        products: assignedProducts,
      },
    }

    dispatch(assignProducts(body))
    handleAssignedConfirmationAlert()
  }

  const handleSuccessUsersBatchAlert = () => {
    dispatch(resetUsersBatch())
  }

  useEffect(() => {
    if (partners && partners.products?.isSuccess) {
      handleShowActionAlert()
      setShowSuccessAlert(partners.products?.isSuccess)
      dispatch(resetsAssignProductsIsSuccess())
    }
  }, [partners.products])

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Partners' />
        <MainButton
          color='primary'
          data-testid='button-create-partner'
          fontSize='1rem'
          height='3.75rem'
          onClick={navigateToCreateUser}
          radius='0.62rem'
          width='18rem'
        >
          Crear partner
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={partners?.meta?.total ?? 0}
        onPageChange={onPageChange}
        page={page}
        rowsPerPageOptions={[10]}
        SelectProps={{
          native: true,
        }}
      >
        {partners?.data?.map((partner) => (
          <TableRow key={partner.id}>
            <TableCell align='left'>{partner.name}</TableCell>
            <TableCell align='left'>{partner.code}</TableCell>
            <TableCell align='left'>{getTypePartner(partner.type)}</TableCell>
            <TableCell align='left'>
              <Typography noWrap paragraph variant='caption'>
                {`Nombre: ${partner.company?.name}`}
                <br />
                {`País: ${partner.company?.country_code}`}
                <br />
                {`Teléfono: ${partner.company?.phone_number}`}
                <br />
                {`RFC: ${partner.company?.tax_id ?? '-'}`}
                <br />
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
                <Grid item onClick={() => handlePartner(partner)}>
                  <Tooltip title='Asignar productos'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <PlaylistAddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <UploadUserBatch
                    icon={<UploadFileIcon />}
                    partner={partner}
                  />
                </Grid>
                <Grid item>
                  <UploadIconPartner
                    icon={<GroupAddIcon />}
                    partner={partner}
                  />
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align='left'>
              <Grid
                alignItems='center'
                container
                direction='row'
                justifyContent='center'
                spacing={1}
              >
                <Grid item onClick={() => handleProductsAssigned(partner)}>
                  <Tooltip title='Ver productos'>
                    <IconButton
                      color='primary'
                      data-testid={`icon-button-${partner.name}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {isShowAssignProductsAlert && (
        <ActionAlert
          actionAlertContentText='Elige uno o mas productos para asignar a este partner'
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Asignar productos a ${partnerActionAlert.name}`}
          isOpen={isShowAssignProductsAlert}
          isShowPrimaryButton
          onClick={handleAssignedConfirmationAlert}
          primaryButtonTextAlert='Asignar'
          setActionsIsOpen={setIsShowAssignProductsAlert}
        >
          <ProductContainer
            assignedProducts={setAssignedProducts}
            partner={partnerActionAlert.name}
          />
        </ActionAlert>
      )}
      {isShowProducts && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Productos asignados a ${partnerInfo?.name}`}
          isOpen={isShowProducts}
          onClick={handleProductAssigned}
          setActionsIsOpen={setIsShowProducts}
        >
          <ProductsByPartnerContainer partner={partnerInfo} />
        </ActionAlert>
      )}
      {isShowAssignedConfirmationAlert && (
        <Alert
          alertContentText='¿Estás seguro de asignar estos productos?'
          actionButton={handleProductAssigned}
          alertTextButton='Cancelar'
          alertTitle='Confirmar'
          isOpen={isShowAssignedConfirmationAlert}
          isShowPrimaryButton
          primaryButtonTextAlert='Aceptar'
          setIsOpen={setIsShowAssignedConfirmationAlert}
        />
      )}
      {showSuccessAlert && (
        <Alert
          alertContentText='Los productos se asignaron con éxito'
          alertTextButton='Cerrar'
          alertTitle='¡Asignación exitosa!'
          isOpen={showSuccessAlert}
          setIsOpen={setShowSuccessAlert}
        />
      )}
      {usersBatch?.isSuccess && (
        <Alert
          alertContentText={(
            <>
              {usersBatch?.errors?.length !== 0 ? (
                <>
                  <Typography
                    color='error'
                    component='span'
                    variant='subtitle1'
                  >
                    <b>Total de errores:&nbsp;</b>
                    {usersBatch?.errors?.length}
                  </Typography>
                  <br />
                  <br />
                  <CSVLink
                    data={usersBatch?.errors}
                    filename='user-upload-errors.csv'
                  >
                    Ver detalle de errores
                  </CSVLink>
                </>
              ) : (
                <Typography component='span' variant='subtitle1'>
                  <b>Total de filas procesadas:&nbsp;</b>
                  {usersBatch?.rowsProcessed}
                </Typography>
              )}
              <br />
            </>
          )}
          alertTextButton='Cerrar'
          alertTitle={`¡${
            usersBatch?.errors?.length
              ? 'El archivo contiene errores'
              : 'Creación exitosa'
          }!`}
          isOpen={usersBatch?.isSuccess}
          setIsOpen={handleSuccessUsersBatchAlert}
        />
      )}
      {resultSubscriptionFile?.isSuccess && (
        <Alert
          alertContentText={(
            <>
              <Typography component='span' variant='subtitle1'>
                <b>Total de registros:&nbsp;</b>
                {resultSubscriptionFile?.total_processed}
              </Typography>
              <br />
              <Typography component='span' variant='subtitle1'>
                <b>Cargados con éxito:&nbsp;</b>
                {resultSubscriptionFile?.total_successfully_processed}
              </Typography>
              <br />
              <Typography color='error' component='span' variant='subtitle1'>
                <b>Con error:&nbsp;</b>
                {resultSubscriptionFile?.total_unprocessed}
              </Typography>
              <br />
              <br />
              {resultSubscriptionFile?.unprocessed_users?.length !== 0 && (
                <CSVLink
                  data={handleUnprocessedUsers(
                    resultSubscriptionFile?.unprocessed_users,
                  )}
                  filename='user-upload-unprocessed.csv'
                >
                  Ver detalle de errores
                </CSVLink>
              )}
            </>
          )}
          alertTextButton='Cerrar'
          alertTitle='Resultado'
          isOpen
          setIsOpen={handleAlertSuccess}
        />
      )}
    </Box>
  )
}

export default Partners
