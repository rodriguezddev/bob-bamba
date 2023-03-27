import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, Grid } from '@mui/material'
import { GeneralTitle } from '../../../../components/texts'
import theme from '../../../../theme'
import { getProductsNotActive } from '../../../../slices/product/productSlice'
import ProductDetails from './ProductDetails'
import { MainButton } from '../../../../components/buttons'
import { Alert } from '../../../../components/modals'

const ProductsNotActive = ({ userId }) => {
  const dispatch = useDispatch()
  const { productsNotActive } = useSelector((state) => state.product)
  const [isShowProductDetailsAlert, setIsShowProductDetailsAlert] = useState(false)
  const [productSubscription, setProductSubscription] = useState({})

  useEffect(() => {
    dispatch(getProductsNotActive(userId))
  }, [])

  const handleShowProductsDetails = (productData) => {
    setProductSubscription(productData)
    setIsShowProductDetailsAlert(true)
  }

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

ProductsNotActive.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default ProductsNotActive
