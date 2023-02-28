import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import { useNavigate } from 'react-router-dom'
import {
  Box, Grid, IconButton, Tooltip, Typography,
} from '@mui/material'
import { CSVLink } from 'react-csv'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { ActionAlert, Alert } from '../../components/modals'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import {
  assignProducts,
  getPartners,
  handleSubscriptionIsSuccess,
  resetsAssignProductsIsSuccess,
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

const Partners = () => {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { partners } = useSelector((state) => state.partner)
  const { resultSubscriptionFile } = useSelector((state) => state.partner)
  const [partnerActionAlert, setPartnerActionAlert] = useState({})
  const [assignedProducts, setAssignedProducts] = useState([])
  const [showActionAlert, setShowActionAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

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

  const handlePartner = (partnerId) => {
    setPartnerActionAlert(partnerId)
    setShowActionAlert(true)
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
  }

  useEffect(() => {
    if (partners && partners.products?.isSuccess) {
      setShowActionAlert(false)
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
            <TableCell align='center'>{partner.name}</TableCell>
            <TableCell align='center'>{partner.code}</TableCell>
            <TableCell align='center'>{getTypePartner(partner.type)}</TableCell>
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
                spacing={4}
              >
                <Grid item onClick={() => handlePartner(partner)}>
                  <Tooltip title='Asignar productos'>
                    <IconButton color='primary'>
                      <PlaylistAddCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <UploadIconPartner
                    icon={<GroupAddIcon />}
                    partner={partner}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {showActionAlert && (
        <ActionAlert
          actionAlertContentText='Elige uno o mas productos para asignar a este partner'
          actionAlertTextButton='Cerrar'
          actionAlertTitle={`Asignar productos a ${partnerActionAlert.name}`}
          isOpen={showActionAlert}
          isShowPrimaryButton
          onClick={handleProductAssigned}
          primaryButtonTextAlert='Asignar'
          setActionsIsOpen={setShowActionAlert}
        >
          <ProductContainer
            assignedProducts={setAssignedProducts}
            partner={partnerActionAlert.name}
          />
        </ActionAlert>
      )}
      {showSuccessAlert && (
        <Alert
          alertContentText='Los productos se asignaron con éxito'
          alertTextButton='Cerrar'
          alertTitle='Asignación exitosa!'
          isOpen={showSuccessAlert}
          setIsOpen={setShowSuccessAlert}
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
              {resultSubscriptionFile.unprocessed_users.length !== 0 && (
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
