/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Grid } from '@mui/material'
import { GeneralTitle } from '../../../../../components/texts'
import theme from '../../../../../theme'
import { getProductsNotActive } from '../../../../../slices/product/productSlice'
import ProductDetails from '../ProductDetails'
import { MainButton } from '../../../../../components/buttons'
import { ActionAlert, Alert } from '../../../../../components/modals'
import ProductsContainer from '../ProductsContainer'
import {
  createSubscription,
  resetSubscription,
} from '../../../../../slices/subscriptions/subscriptionsSlice'

const ProductsNotActive = ({ userId }) => {
  const dispatch = useDispatch()
  const { productsNotActive } = useSelector((state) => state.product)
  const { subscriptionActivated } = useSelector((state) => state.subscriptions)
  const [isShowProductDetailsAlert, setIsShowProductDetailsAlert] = useState(false)
  const [productSubscription, setProductSubscription] = useState({})
  const [isShowAddProducts, setIsShowAddProducts] = useState(false)
  const [assignedProducts, setAssignedProducts] = useState([])

  useEffect(() => {
    dispatch(getProductsNotActive(userId))
  }, [])

  const handleShowProductsDetails = (productData) => {
    setProductSubscription(productData)
    setIsShowProductDetailsAlert(true)
  }

  const handleShowAddProducts = () => {
    setIsShowAddProducts(!isShowAddProducts)
  }

  const handleProducts = () => {
    const data = {
      userId,
      products: assignedProducts.map((product) => product.sku),
    }

    dispatch(createSubscription(data))
  }

  const handleSubscriptionSuccess = () => {
    dispatch(resetSubscription())
    setAssignedProducts([])
  }

  useEffect(() => {
    if (subscriptionActivated?.isSuccess) {
      handleShowAddProducts()
    }
  }, [subscriptionActivated?.isSuccess])

  return (
    <Box>
      {productsNotActive?.data.length !== 0 && (
        <Grid marginTop='5rem'>
          <GeneralTitle
            data-testid='subscriptions-title'
            lineHeight='.5rem'
            text='Productos sin contratar'
          />
          <GeneralTitle
            fontSize='1rem'
            fontWeight='200'
            text={`${productsNotActive?.data.length} productos`}
          />
          <Box>
            <MainButton
              data-testid='subscriptions-button'
              height='3rem'
              onClick={handleShowAddProducts}
              width='20rem'
            >
              Agregar suscripción
            </MainButton>
          </Box>
          <Card
            sx={{
              bgcolor: theme.palette.background.blueLight,
              margin: '1rem 0',
            }}
          >
            <Grid container display='flex' spacing={2} sx={{ padding: '2rem' }}>
              {productsNotActive?.data.map((product) => (
                <Grid key={product.id} item xs={4}>
                  <Card
                    sx={{
                      height: '100%',
                    }}
                  >
                    <CardContent>{product.name}</CardContent>
                    <MainButton
                      background={theme.palette.background.default}
                      data-testid={`button-to-show-product-${product.sku}-details`}
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
          </Card>
        </Grid>
      )}
      {isShowAddProducts && (
        <ActionAlert
          actionAlertContentText='Elige uno o más productos para la suscripción'
          actionAlertTextButton='Cerrar'
          actionAlertTitle='Crear suscripción'
          isOpen={isShowAddProducts}
          isShowPrimaryButton
          primaryButtonTextAlert='Suscribir'
          onClick={handleProducts}
          setActionsIsOpen={handleShowAddProducts}
        >
          <ProductsContainer
            assignedSubscriptions={setAssignedProducts}
            initialSubscriptions={assignedProducts}
            subscriptions={productsNotActive}
          />
        </ActionAlert>
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
      {subscriptionActivated?.isSuccess && (
        <Alert
          alertTextButton='Cerrar'
          alertTitle='¡Suscripción creada correctamente!'
          isOpen={subscriptionActivated?.isSuccess}
          setIsOpen={handleSubscriptionSuccess}
        />
      )}
    </Box>
  )
}

ProductsNotActive.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default ProductsNotActive
