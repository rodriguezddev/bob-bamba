import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Box, Grid, List, ListItem, Typography,
} from '@mui/material'
import { getProductDetails } from '../../../../slices/product/productSlice'

const ProductDetails = ({ productId }) => {
  const dispatch = useDispatch()
  const { productDetails } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(getProductDetails(productId))
  }, [])

  return (
    <Box textAlign='left'>
      <Grid container direction='row'>
        <Grid item px={3} xs={6}>
          <Grid container direction='row' justifyContent='left'>
            <Typography fontWeight={800}>Sku: </Typography>
            <Typography ml={1}>{productDetails?.sku}</Typography>
          </Grid>
        </Grid>
        <Grid item px={3} xs={6}>
          <Grid container direction='row' justifyContent='left'>
            <Typography fontWeight={800}>Recurrente: </Typography>
            <Typography ml={1}>
              {productDetails?.is_recurrent ? 'Sí' : 'No'}
            </Typography>
          </Grid>
        </Grid>
        {productDetails?.carrier_services?.length !== 0 && (
          <Grid item mt={5} px={1} xs={6}>
            <Grid container direction='column' justifyContent='left'>
              <Typography fontWeight={800} pl={2}>
                Carrier services
              </Typography>
              <List
                sx={{
                  maxHeight: '10rem',
                  overflow: 'auto',
                }}
              >
                {productDetails?.carrier_services?.map((carrierService) => (
                  <ListItem key={carrierService?.id}>
                    <Typography>
                      {carrierService?.name}
                      {' - '}
                      {carrierService?.carrier}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        {productDetails?.prices?.length !== 0 && (
          <Grid item mt={5} px={1} xs={6}>
            <Grid container direction='column' justifyContent='left'>
              <Typography fontWeight={800} pl={2}>
                Precios por partner
              </Typography>
              <List
                sx={{
                  maxHeight: '10rem',
                  overflow: 'auto',
                }}
              >
                {productDetails?.prices?.map((price) => (
                  <ListItem key={price?.partner}>
                    <Typography>
                      {price?.partner}
                      {': '}
                      $
                      {price?.price}
                      {' '}
                      {price?.currency_code}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        <Grid item mt={3} px={1} xs={12}>
          <Grid container direction='column' justifyContent='left'>
            <List
              sx={{
                maxHeight: '14rem',
                overflow: 'auto',
              }}
            >
              {productDetails?.description?.map((description) => (
                <Box key={description?.section}>
                  <Typography fontWeight={800} pl={2}>
                    {description?.section}
                  </Typography>
                  {description?.body.map((body) => (
                    <ListItem key={body}>
                      <Typography>{body}</Typography>
                    </ListItem>
                  ))}
                </Box>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default ProductDetails
