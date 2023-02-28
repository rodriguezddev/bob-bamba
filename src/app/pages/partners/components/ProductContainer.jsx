import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Grid,
  Box,
  Typography,
  CardContent,
  Card,
  ListItemButton,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FormAlert from './FormAlert/FormAlert'
import { Pagination } from '../../../components/tables'
import { getProducts } from '../../../slices/product/productSlice'
import { handleActiveProducts } from '../../../utils/utilsHandleActiveProducts'

const ProductContainer = ({ assignedProducts }) => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const { products } = useSelector((state) => state.product)
  const [productsAvailable, setProductsAvailable] = useState([])
  const [product, setProduct] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [showActionAlert, setShowActionAlert] = useState(false)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    if (products) {
      setProductsAvailable(handleActiveProducts(products, selectedProducts))
    }
  }, [products])

  const onPageChange = async (event, newPage) => {
    await dispatch(getProducts(`?page=${newPage + 1}`))
    setPage(newPage)
  }

  const handleSelectedProducts = (value) => {
    const filteredProduct = productsAvailable.filter(
      (item) => item.sku !== value.sku,
    )
    const productCandidates = [...selectedProducts, value]
    setSelectedProducts(productCandidates)
    setProductsAvailable(filteredProduct)
    assignedProducts(productCandidates)
  }

  const handleUnSelectedProduct = (value) => {
    const unSelectedProduct = selectedProducts.filter(
      (item) => item.sku !== value.sku,
    )

    const returnedProducts = [...productsAvailable, value]

    setProductsAvailable(returnedProducts)
    setSelectedProducts(unSelectedProduct)
  }

  const handlePartner = (value) => {
    setProduct(value)
    setShowActionAlert(true)
  }

  return (
    <Box>
      <Typography
        data-testid='products-available'
        sx={{
          paddingTop: '1.5rem',
          fontWeight: 600,
        }}
      >
        Productos disponibles
      </Typography>
      <Grid container direction='row' justifyContent='center' spacing={2}>
        <Grid item xs={6}>
          <Grid>
            <Box
              sx={{
                overflowY: 'scroll',
                padding: '1rem',
                height: '30rem',
              }}
            >
              {productsAvailable.map((value) => (
                <Card
                  key={value?.sku}
                  sx={{
                    margin: '.5rem 0',
                    maxWidth: '27rem',
                  }}
                >
                  <ListItemButton onClick={() => handlePartner(value)}>
                    <CardContent>
                      <Typography
                        sx={{
                          margin: '.5rem',
                        }}
                      >
                        {value.sku}
                      </Typography>
                    </CardContent>
                  </ListItemButton>
                </Card>
              ))}
            </Box>
            <Pagination
              count={products?.meta?.total ?? 0}
              onPageChange={onPageChange}
              page={page}
              SelectProps={{
                native: true,
              }}
              rowsPerPageOptions={[10]}
              labelDisplayedRows={() => ''}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            overflowY: 'auto',
            padding: '1rem',
            height: '30rem',
          }}
        >
          {selectedProducts.length === 0 ? (
            <Grid
              alignItems='center'
              container
              direction='row'
              height='25rem'
              justifyContent='center'
            >
              <Typography
                sx={{
                  textAlign: 'center',
                }}
              >
                Aquí se mostraran los productos seleccionados
              </Typography>
            </Grid>
          ) : (
            selectedProducts.map((selectedProduct) => (
              <Card
                key={selectedProduct.sku}
                sx={{
                  cursor: 'pointer',
                  margin: '.5rem 0',
                  maxWidth: '27rem',
                }}
              >
                <CardContent>
                  <Grid
                    container
                    direction='row'
                    justifyContent='space-between'
                  >
                    <Grid item xs={8}>
                      <Typography
                        sx={{
                          margin: '.5rem',
                        }}
                      >
                        {selectedProduct.sku}
                        -
                        {selectedProduct.price}
                        {selectedProduct.currency_code}
                      </Typography>
                    </Grid>
                    <Grid
                      data-testid='remove-product-button'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleUnSelectedProduct(selectedProduct)}
                    >
                      <HighlightOffIcon />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>
      {showActionAlert && (
        <FormAlert
          alertContentText='Agregue el precio para este producto'
          alertTextButton='Cerrar'
          alertTitle='Precio del producto'
          isOpen={showActionAlert}
          isShowPrimaryButton
          primaryButtonTextAlert='Agregar'
          product={product}
          setIsOpen={setShowActionAlert}
          selectedProducts={(e) => {
            handleSelectedProducts(e)
          }}
        />
      )}
    </Box>
  )
}

ProductContainer.propTypes = {
  assignedProducts: PropTypes.func.isRequired,
}

export default ProductContainer
