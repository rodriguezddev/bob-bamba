import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Box, Card, CardContent, Grid,
} from '@mui/material'
import { formatDate } from '../../../utils/utilsFormat'
import { handleSubscriptions } from '../../../utils/utilsHandleSubscriptions'
import {
  getPeriodProducts,
  getStatusProducts,
} from '../../../utils/UtilsTranslate'
import {
  cancelSubscription,
  resetSubscription,
} from '../../../slices/subscriptions/subscriptionsSlice'
import { Alert, PdfViewer } from '../../../components/modals'
import { Avatar } from '../../../components/avatar'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { getUser } from '../../../slices/user/userSlice'
import { MainInput, SelectInput } from '../../../components/inputs'
import theme from '../../../theme'
import ActivationDetailsCard from './components/ActivationDetailsCard'

const UserDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user } = useSelector((state) => state.user)
  const { canceledSubscription } = useSelector((state) => state.subscriptions)
  const [subscriptions, setSubscriptions] = useState([])
  const [subscriptionsId, setSubscriptionsId] = useState('')
  const [isOpenPdfViewer, setIsOpenPdfViewer] = useState(false)
  const [pdfViewerFile, setPdfViewerFile] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    dispatch(getUser(id))
  }, [])

  useEffect(() => {
    if (user) {
      setSubscriptions(user.subscriptions)
    }
  }, [user])

  useEffect(() => {
    if (Object.entries(canceledSubscription).length !== 0) {
      setSubscriptions(handleSubscriptions(canceledSubscription, subscriptions))
    }

    if (canceledSubscription?.isSuccess) {
      setShowSuccessAlert(canceledSubscription?.isSuccess)
      dispatch(resetSubscription())
    }
  }, [canceledSubscription])

  const handlePdfViewerFile = (file) => {
    setPdfViewerFile(file)
    setIsOpenPdfViewer(true)
  }

  const handleCancelSubscription = (subscriptionId) => {
    setSubscriptionsId(subscriptionId)
    setShowAlert(true)
  }

  const setSubscription = () => {
    dispatch(cancelSubscription(subscriptionsId))
    setShowAlert(false)
  }

  return (
    <Box sx={{ width: '100%', marginBottom: '2rem' }}>
      <Grid>
        <BackButton />
        <GeneralTitle text='Detalles del usuario' />
        <Grid marginTop='.25rem'>
          <Avatar gender={user.gender} height='9.4rem' width='9.5rem' />
        </Grid>
      </Grid>
      <form>
        <Grid container marginY='2rem' spacing='2rem'>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Nombre(s)*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.name || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Primer Apellido*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                placeholder=''
                hiddenIcon
                radius='.5rem'
                value={user.lastname || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Segundo Apellido*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.second_lastname || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Email*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.email || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Fecha de nacimiento*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.birthdate}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='CURP*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.personal_id || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='RFC*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                height='3rem'
                placeholder=''
                hiddenIcon
                radius='.5rem'
                value={user.tax_id || '-'}
                width='18rem'
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Genero' />
            <Grid marginTop='.5rem'>
              <SelectInput
                disabled
                height='3rem'
                onChange={() => {}}
                value={user.gender || '-'}
              >
                <option value='-'>Seleccionar</option>
                <option value='M'>Masculino</option>
                <option value='F'>Femenino</option>
                <option value='O'>Otro</option>
              </SelectInput>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {subscriptions?.length !== 0 && (
        <Grid marginTop='5rem'>
          <Grid container direction='column'>
            <GeneralTitle
              data-testid='subscriptions-title'
              lineHeight='.5rem'
              text='Suscripciones'
            />
            <GeneralTitle
              fontSize='1rem'
              fontWeight='200'
              text={`${subscriptions?.length} suscripciones activas`}
            />
          </Grid>
          {subscriptions?.map((subscriptionItem, index) => (
            <Card
              key={subscriptionItem.id}
              sx={{
                margin: '2.5rem 0',
                bgcolor: theme.palette.background.blueLight,
              }}
            >
              <CardContent sx={{ padding: '2rem' }}>
                <Grid
                  alignItems='center'
                  container
                  direction='row'
                  justifyContent='space-between'
                  marginBottom='2.5rem'
                >
                  <GeneralTitle
                    fontSize='1.25rem'
                    lineHeight='1rem'
                    marginRight='.5rem'
                    text={`Suscripción #${index + 1}`}
                    xs={4}
                  />
                  <GeneralTitle
                    fontSize='1.25rem'
                    lineHeight='1rem'
                    marginRight='.5rem'
                    text={`Estatus: ${getStatusProducts(
                      subscriptionItem.status,
                    )}`}
                    xs={4}
                  />
                  <Grid item xs={3}>
                    <Grid container justifyContent='flex-end'>
                      <Grid item px={1}>
                        <MainButton
                          background={theme.palette.background.blueLight}
                          data-testid={`button-to-show-certificate-id-${
                            index + 1
                          }`}
                          onClick={() => handlePdfViewerFile(
                            subscriptionItem.certificate_file,
                          )}
                          type='secondary'
                        >
                          Ver certificado
                        </MainButton>
                      </Grid>
                      <Grid item px={1}>
                        <MainButton
                          data-testid={`button-to-cancel-subscription-id-${
                            index + 1
                          }`}
                          disabled={subscriptionItem.status !== 'ACTIVE'}
                          onClick={() => handleCancelSubscription(subscriptionItem.id)}
                        >
                          Cancelar
                        </MainButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <ActivationDetailsCard
                  activationDate={formatDate(subscriptionItem.activated_at)}
                  activationType={getPeriodProducts(
                    subscriptionItem.renew_period,
                  )}
                  nextActivation={formatDate(subscriptionItem.next_renewal_at)}
                />
                <Grid marginTop='2.5rem'>
                  <GeneralTitle
                    fontSize='1rem'
                    lineHeight='2rem'
                    text='Productos contratados'
                  />
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginBottom: '1rem', marginTop: '.5rem' }}
                  >
                    {subscriptionItem.products.map((product) => (
                      <Grid item key={product.id} xs={4}>
                        <Card
                          sx={{
                            height: '100%',
                          }}
                        >
                          <CardContent>{product.name}</CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
      <PdfViewer
        file={pdfViewerFile}
        isOpen={isOpenPdfViewer}
        pdfViewerTitle='Certificado'
        pdfViewerButtonText='Cerrar'
        setIsOpen={setIsOpenPdfViewer}
      />
      {showAlert && (
        <Alert
          actionButton={setSubscription}
          alertContentText='¿Seguro que quiere cancelar esta suscripcion?'
          alertTextButton='Cerrar'
          alertTitle='Se cancelará la suscripción'
          primaryButtonTextAlert='Cancelar'
          isOpen={showAlert}
          isShowPrimaryButton
          setIsOpen={setShowAlert}
        />
      )}
      {showSuccessAlert && (
        <Alert
          alertTextButton='Cerrar'
          alertTitle='¡Suscripción cancelada!'
          isOpen={showSuccessAlert}
          setIsOpen={setShowSuccessAlert}
        />
      )}
    </Box>
  )
}

export default UserDetails
