import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Box, Grid, IconButton, Tooltip, Typography,
} from '@mui/material'
import { CSVLink } from 'react-csv'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AddAlertIcon from '@mui/icons-material/AddAlert'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import KeyIcon from '@mui/icons-material/Key'
import LanguageIcon from '@mui/icons-material/Language'
import { ActionAlert, Alert } from '../../components/modals'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import {
  assignAccount,
  assignProducts,
  getPartners,
  resetsAssignProductsIsSuccess,
  resetUsersBatch,
} from '../../slices/partner/partnerSlice'
import { getTypePartner } from '../../utils/UtilsTranslate'
import { MainButton } from '../../components/buttons'
import { MainFilter } from '../../components/filters'
import { filters } from './components/filters'
import ProductContainer from './components/ProductContainer'
import ProductsByPartnerContainer from './components/ProductsByPartnerContainer/ProductsByPartnerContainer'
import useRowsPerPage from '../../hooks/useRowsPerPage'
import UpdatePartner from './components/UpdatePartner'
import AssignAccountForm from './components/assignAccountForm'
import { resetProductsByPartners } from '../../slices/product/productSlice'
import PartnerToken from './components/PartnerToken/PartnerToken'
import PartnerWebHook from './components/partnerWebHook'

const Partners = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accountFormHook = useForm()
  const { handleSubmit, reset } = accountFormHook
  const { partners, usersBatch } = useSelector((state) => state.partner)
  const [partnerActionAlert, setPartnerActionAlert] = useState({})
  const [partnerInfo, setPartnerInfo] = useState({})
  const [assignedProducts, setAssignedProducts] = useState([])
  const [isShowAssignProductsAlert, setIsShowAssignProductsAlert] = useState(false)
  const [isShowProducts, setIsShowProducts] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [isShowAssignedConfirmationAlert, setIsShowAssignedConfirmationAlert] = useState(false)
  const [isShowDialogUpdate, setIsShowDialogUpdate] = useState(false)
  const [showAssignAccountAlert, setShowAssignAccountAlert] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState({})
  const [isShowToken, setIsShowToken] = useState(false)
  const [isShowWebhook, setIsShowWebhook] = useState(false)
  const {
    rowsPerPage,
    handleChangeRowsPerPage,
    handleSearch,
    page,
    onPageChange,
  } = useRowsPerPage(getPartners, dispatch)

  useEffect(() => {
    dispatch(getPartners())
  }, [])

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

  const handleWebhook = (partner) => {
    setSelectedPartner(partner)
    setIsShowWebhook(true)
  }

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

  const handleNavigateToCreateUsers = (partnerId) => {
    navigate(`/partners/create-users/${partnerId}`)
  }

  const handleShowDialogUpdate = () => {
    setIsShowDialogUpdate(!isShowDialogUpdate)
  }

  const handleUpdate = (partner) => {
    handleShowDialogUpdate()
    setSelectedPartner(partner)
  }

  const handleAssignAccount = (partner) => {
    setShowAssignAccountAlert(!showAssignAccountAlert)
    setSelectedPartner(partner)
  }

  const handlePartnerToken = (partner) => {
    setIsShowToken(!isShowToken)
    setSelectedPartner(partner)
  }

  const onSubmit = (dataForm) => {
    const data = {
      notice_account_id: dataForm.accountId,
    }

    dispatch(assignAccount({ data, partnerId: selectedPartner.id }))
    reset()
    setShowAssignAccountAlert(!showAssignAccountAlert)
  }

  const handleCloseDialogShowProducts = () => {
    dispatch(resetProductsByPartners())
    setIsShowProducts(false)
  }

  const handleShowDialogTokenPartner = () => {
    setIsShowToken(false)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Partners' />
        <MainButton
          color='primary'
          data-testid='button-create-partner'
          fontSize='0.85rem'
          height='3rem'
          onClick={navigateToCreateUser}
          radius='0.62rem'
          width='15rem'
        >
          Crear partner
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={partners?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {partners?.data?.map((partner) => (
          <TableRow key={partner.id}>
            <TableCell align='left'>{partner.name}</TableCell>
            <TableCell align='left'>{partner.code}</TableCell>
            <TableCell align='left'>{partner.webhook_url}</TableCell>
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
              <Grid alignItems='center' container direction='row' spacing={1}>
                <Grid item onClick={() => handlePartner(partner)}>
                  <Tooltip title='Asignar productos'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <PlaylistAddCircleIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item onClick={() => handleUpdate(partner)}>
                  <Tooltip title='Editar partner'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <BorderColorIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  onClick={() => handleNavigateToCreateUsers(partner.id)}
                >
                  <Tooltip title='Carga de usuarios'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <GroupAddIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item onClick={() => handleAssignAccount(partner)}>
                  <Tooltip title='Asignar cuenta de notificaciones'>
                    <IconButton color='primary' sx={{ padding: 0 }}>
                      <AddAlertIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item onClick={() => handlePartnerToken(partner)}>
                  <Tooltip title='Token'>
                    <IconButton
                      color='primary'
                      data-testid={`icon-button-${partner.name}`}
                      sx={{ padding: 0 }}
                    >
                      <KeyIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item onClick={() => handleProductsAssigned(partner)}>
                  <Tooltip title='Ver productos'>
                    <IconButton
                      color='primary'
                      data-testid={`icon-button-${partner.name}`}
                      sx={{ padding: 0 }}
                    >
                      <VisibilityIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item onClick={() => handleWebhook(partner)}>
                  <Tooltip title='Webhook'>
                    <IconButton
                      color='primary'
                      data-testid={`icon-button-${partner.name}`}
                      sx={{ padding: 0 }}
                    >
                      <LanguageIcon sx={{ fontSize: '1.25rem' }} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {isShowDialogUpdate && (
        <UpdatePartner
          dialogUpdate={handleShowDialogUpdate}
          isShowDialogUpdate={isShowDialogUpdate}
          partner={selectedPartner}
        />
      )}
      {isShowAssignProductsAlert && (
        <ActionAlert
          actionAlertContentText='Elige uno o más productos para asignar a este partner'
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
          setActionsIsOpen={handleCloseDialogShowProducts}
        >
          <ProductsByPartnerContainer partner={partnerInfo} />
        </ActionAlert>
      )}
      {isShowToken && (
        <PartnerToken
          handleDialog={handleShowDialogTokenPartner}
          isShowToken={isShowToken}
          selectedPartner={selectedPartner}
        />
      )}
      {isShowWebhook && (
        <PartnerWebHook
          isShowWebhook={isShowWebhook}
          setIsShowWebhook={setIsShowWebhook}
          selectedPartner={selectedPartner}
        />
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
      {showAssignAccountAlert && (
        <ActionAlert
          actionAlertContentText=''
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Asignar cuenta a ${selectedPartner?.name}`}
          isOpen={showAssignAccountAlert}
          isShowPrimaryButton
          maxWidth='sm'
          onClick={handleSubmit(onSubmit)}
          primaryButtonTextAlert='Asignar'
          setActionsIsOpen={setShowAssignAccountAlert}
        >
          <AssignAccountForm accountFormHook={accountFormHook} />
        </ActionAlert>
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
    </Box>
  )
}

export default Partners
