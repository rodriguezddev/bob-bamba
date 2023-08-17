import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Card, CardContent, Grid, Typography,
} from '@mui/material'
import { getProductsByPartners } from '../../../../slices/product/productSlice'
import { Pagination } from '../../../../components/tables'
import { Alert } from '../../../../components/modals'
import ProductDetails from '../../../users/userDetails/components/ProductDetails'

const ProductsByPartnerContainer = ({ partner }) => {
  const dispatch = useDispatch()
  const [pageProducts, setPageProducts] = useState(0)
  const { productsByPartners } = useSelector((state) => state.product)
  const [productsWithPrice, setProductWithPrice] = useState([])
  const [isShowProductDetailsAlert, setIsShowProductDetailsAlert] = useState(false)
  const [productId, setProductId] = useState('')

  useEffect(() => {
    dispatch(
      getProductsByPartners({ partner: partner.name, limit: '&limit=100' }),
    )
  }, [])

  useEffect(() => {
    let newProductsByPartner = []
    productsByPartners?.data?.forEach((productByPartner) => {
      const partnerIndex = productByPartner.prices?.find(
        (partnerByPrice) => partnerByPrice.partner === partner.name,
      )

      if (partnerIndex) {
        newProductsByPartner = [
          ...newProductsByPartner,
          {
            id: productByPartner?.id,
            name: productByPartner?.name,
            sku: productByPartner?.sku,
            price: partnerIndex?.price,
          },
        ]
      }
    })

    setProductWithPrice(newProductsByPartner)
  }, [productsByPartners])

  const onPageChange = async (event, newPage) => {
    await dispatch(
      getProductsByPartners({
        partner: partner.name,
        page: `&page=${newPage + 1}`,
      }),
    )
    setPageProducts(newPage)
  }

  const handleShowProducts = (product) => {
    setIsShowProductDetailsAlert(true)
    setProductId(product)
  }

  return (
    <Grid container display='flex'>
      {productsWithPrice.length !== 0 ? (
        productsWithPrice.map((product) => (
          <Grid item key={product?.sku} xs={4}>
            <Card
              sx={{
                margin: '.5rem',
                maxWidth: '17rem',
              }}
            >
              <CardContent key={product?.sku} sx={{ padding: '1rem' }}>
                <Typography
                  fontSize='1rem'
                  fontWeight={600}
                  sx={{
                    margin: '.5rem',
                  }}
                >
                  {product?.name}
                </Typography>
                <Box display='flex'>
                  <Typography fontSize='0.85rem' fontWeight={600} ml={1}>
                    Sku:
                  </Typography>
                  <Typography fontSize='0.85rem' ml={1}>
                    {product?.sku}
                  </Typography>
                </Box>
                <Box display='flex'>
                  <Typography fontSize='0.85rem' fontWeight={600} ml={1}>
                    Precio:
                  </Typography>
                  <Typography fontSize='0.85rem' ml={1}>
                    {product?.price}
                    MXN
                  </Typography>
                </Box>
                <Box m={1}>
                  <Typography
                    fontSize='0.85rem'
                    onClick={() => handleShowProducts(product)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <u data-testid={`details-button-${product?.name}`}>
                      Ver Detalle
                    </u>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography align='center'>No tiene productos asignados</Typography>
        </Grid>
      )}
      <Pagination
        count={productsByPartners?.meta?.total ?? 0}
        labelDisplayedRows={() => null}
        onPageChange={onPageChange}
        page={pageProducts}
        rowsPerPage={10}
        SelectProps={{
          native: true,
        }}
      />
      {isShowProductDetailsAlert && (
        <Alert
          actionAlertContentText='Detalles del producto'
          alertContentText={<ProductDetails productId={productId?.id} />}
          alertTextButton='Cerrar'
          alertTitle={productId.name}
          isOpen={isShowProductDetailsAlert}
          setIsOpen={setIsShowProductDetailsAlert}
          width='65rem'
        />
      )}
    </Grid>
  )
}

ProductsByPartnerContainer.propTypes = {
  partner: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

export default ProductsByPartnerContainer
