import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { Card, CardContent, Grid } from '@mui/material'
import { GeneralTitle } from '../../../../../components/texts'
import theme from '../../../../../theme'
import { MainButton } from '../../../../../components/buttons'
import {
  getPeriodSubscriptions,
  getStatusProducts,
} from '../../../../../utils/UtilsTranslate'
import { Alert, PdfViewer } from '../../../../../components/modals'
import ActivationDetailsCard from '../ActivationDetailsCard'
import { formatDate } from '../../../../../utils/utilsFormat'
import {
  handleSubscriptionsCanceled,
  handleSubscriptionsNumbers,
  orderSubscriptions,
} from '../../../../../utils/utilsSubscriptions'
import {
  cancelSubscription,
  resetSubscription,
} from '../../../../../slices/subscriptions/subscriptionsSlice'
import ProductDetails from '../ProductDetails'

const Subscriptions = ({ user }) => {
  const dispatch = useDispatch()
  const { canceledSubscription } = useSelector((state) => state.subscriptions)
  const [subscriptions, setSubscriptions] = useState([])
  const [subscriptionsNumbers, setSubscriptionsNumbers] = useState('')
  const [subscriptionsId, setSubscriptionsId] = useState('')
  const [isShowSubscriptionsAlert, setIsShowSubscriptionsAlert] = useState(false)
  const [isShowSubscriptionsSuccessAlert, setIsShowSubscriptionsSuccessAlert] = useState(false)
  const [isOpenPdfViewer, setIsOpenPdfViewer] = useState(false)
  const [pdfViewerFile, setPdfViewerFile] = useState('')
  const [isShowProductDetailsAlert, setIsShowProductDetailsAlert] = useState(false)
  const [productSubscription, setProductSubscription] = useState({})

  useEffect(() => {
    if (user && Object.entries(user)?.length !== 0) {
      setSubscriptions(orderSubscriptions(user.subscriptions))
    }
  }, [user])

  useEffect(() => {
    if (subscriptions) {
      setSubscriptionsNumbers(handleSubscriptionsNumbers(subscriptions))
    }
  }, [subscriptions])

  useEffect(() => {
    if (Object.entries(canceledSubscription).length !== 0) {
      setSubscriptions(
        orderSubscriptions(
          handleSubscriptionsCanceled(subscriptions, canceledSubscription),
        ),
      )
    }

    if (canceledSubscription?.isSuccess) {
      setIsShowSubscriptionsSuccessAlert(canceledSubscription?.isSuccess)
      dispatch(resetSubscription())
    }
  }, [canceledSubscription])

  const handlePdfViewerFile = (file) => {
    setPdfViewerFile(file)
    setIsOpenPdfViewer(true)
  }

  const handleCancelSubscription = (subscriptionId) => {
    setSubscriptionsId(subscriptionId)
    setIsShowSubscriptionsAlert(true)
  }

  const setSubscription = () => {
    dispatch(cancelSubscription(subscriptionsId))
    setIsShowSubscriptionsAlert(false)
  }

  const handleShowProductsDetails = (productData) => {
    setProductSubscription(productData)
    setIsShowProductDetailsAlert(true)
  }

  return (
    <Box>
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
              text={`${subscriptionsNumbers} suscripciones activas`}
            />
          </Grid>
          <Grid
            sx={{
              maxHeight: '70vh',
              overflow: 'auto',
              paddingRight: '1rem',
            }}
          >
            {subscriptions?.map((subscription, index) => (
              <Card
                key={subscription.id}
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
                        subscription.status,
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
                            onClick={() => handlePdfViewerFile(subscription.certificate_file)}
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
                            disabled={subscription.status !== 'ACTIVE'}
                            onClick={() => handleCancelSubscription(subscription.id)}
                          >
                            Cancelar
                          </MainButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <ActivationDetailsCard
                    activationDate={formatDate(subscription.activated_at)}
                    activationType={getPeriodSubscriptions(
                      subscription?.renew_period,
                      subscription?.renew_every,
                    )}
                    nextActivation={formatDate(subscription.next_renewal_at)}
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
                      {subscription?.products.map((product) => (
                        <Grid item key={product.id} xs={4}>
                          <Card
                            sx={{
                              height: '100%',
                            }}
                          >
                            <CardContent>{product.name}</CardContent>
                            <MainButton
                              background={theme.palette.background.default}
                              data-testid={`button-to-show-product-${product.sku}`}
                              onClick={() => handleShowProductsDetails(product)}
                              radius='0'
                              type='secondary'
                              width='6rem'
                            >
                              Ver más
                            </MainButton>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      )}
      <PdfViewer
        file={pdfViewerFile}
        isOpen={isOpenPdfViewer}
        pdfViewerTitle='Certificado'
        pdfViewerButtonText='Cerrar'
        setIsOpen={setIsOpenPdfViewer}
      />
      {isShowSubscriptionsAlert && (
        <Alert
          actionButton={setSubscription}
          alertContentText='¿Seguro que quiere cancelar esta suscripción?'
          alertTextButton='Cerrar'
          alertTitle='Se cancelará la suscripción'
          isOpen={isShowSubscriptionsAlert}
          isShowPrimaryButton
          primaryButtonTextAlert='Cancelar'
          setIsOpen={setIsShowSubscriptionsAlert}
        />
      )}
      {isShowSubscriptionsSuccessAlert && (
        <Alert
          alertTextButton='Cerrar'
          alertTitle='¡Suscripción cancelada!'
          isOpen={isShowSubscriptionsSuccessAlert}
          setIsOpen={setIsShowSubscriptionsSuccessAlert}
        />
      )}
      {isShowProductDetailsAlert && (
        <Alert
          actionAlertContentText='Detalles del producto'
          alertContentText={
            <ProductDetails productId={productSubscription.id} />
          }
          alertTextButton='Cerrar'
          alertTitle={productSubscription.name}
          isOpen={isShowProductDetailsAlert}
          setIsOpen={setIsShowProductDetailsAlert}
          width='68rem'
        />
      )}
    </Box>
  )
}

Subscriptions.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default Subscriptions
