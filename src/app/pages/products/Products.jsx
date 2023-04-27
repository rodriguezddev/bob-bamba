import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Link, Typography } from '@mui/material'
import { GeneralTitle } from '../../components/texts'
import { GeneralTable, TableCell, TableRow } from '../../components/tables'
import { columns } from './components/columns'
import { getProducts } from '../../slices/product/productSlice'
import {
  formatCurrency,
  getPeriodProducts,
  getStatusProducts,
} from '../../utils/UtilsTranslate'
import { Alert } from '../../components/modals'
import DescriptionList from './components/DescriptionList'
import { MainButton } from '../../components/buttons'
import { filters } from './components/filters'
import { MainFilter } from '../../components/filters'
import useRowsPerPage from '../../hooks/useRowsPerPage'

const Products = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.product)
  const [showDetailsProduct, setShowDetailsProduct] = useState(false)
  const [details, setDetails] = useState({})
  const { rowsPerPage, handleChangeRowsPerPage } = useRowsPerPage(getProducts)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const handleSearch = (path) => {
    setSearch(path)
    dispatch(getProducts(path))
  }

  const handleCreateProduct = () => {
    navigate('/products/create')
  }

  const onPageChange = (event, newPage) => {
    dispatch(
      getProducts(
        `${search ? `${search}&` : `?limit=${rowsPerPage}&`}page=${
          newPage + 1
        }`,
      ),
    )
    setPage(newPage)
  }

  const handleShowDetails = () => {
    setShowDetailsProduct(!showDetailsProduct)
  }

  const handleDescription = (description) => {
    handleShowDetails()
    setDetails(
      description?.map((item) => (
        <DescriptionList key={item.section} description={item} />
      )),
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle text='Productos' />
        <MainButton
          color='primary'
          data-testid='button-create-product'
          fontSize='0.85rem'
          height='3rem'
          onClick={handleCreateProduct}
          radius='0.62rem'
          width='15rem'
        >
          Crear producto
        </MainButton>
      </Box>
      <MainFilter fieldDetails={filters} handleSearch={handleSearch} />
      <GeneralTable
        columns={columns}
        count={products?.meta?.total ?? 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        SelectProps={{
          native: true,
        }}
      >
        {products?.data?.map((product) => (
          <TableRow key={product?.id}>
            <TableCell align='left'>{product?.name}</TableCell>
            <TableCell align='left'>{product?.sku}</TableCell>
            <TableCell align='center'>
              {product?.is_recurrent ? 'Sí' : 'No'}
            </TableCell>
            <TableCell align='right'>{product?.expiration_unit}</TableCell>
            <TableCell align='left'>
              {getPeriodProducts(product?.expiration_period)}
            </TableCell>
            <TableCell align='center'>
              {getStatusProducts(product?.status)}
            </TableCell>
            {product?.prices && (
              <TableCell align='left'>
                {product?.prices?.map((price) => (
                  <Typography
                    key={price.partner}
                    noWrap
                    paragraph
                    variant='caption'
                  >
                    {`Partner: ${price.partner}`}
                    <br />
                    {`Precio: $${formatCurrency(price.price)}`}
                    <br />
                    {`Moneda: ${price.currency_code}`}
                  </Typography>
                ))}
              </TableCell>
            )}
            {product?.categories && (
              <TableCell align='left'>
                {product?.categories.map((category) => (
                  <Typography
                    display='block'
                    gutterBottom
                    key={category}
                    variant='caption'
                  >
                    {category}
                  </Typography>
                ))}
              </TableCell>
            )}
            <TableCell align='center'>
              {product?.description ? (
                <Typography
                  onClick={() => handleDescription(product?.description)}
                  sx={{ cursor: 'pointer' }}
                >
                  <u>Ver Detalle</u>
                </Typography>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell align='left'>{product?.brief}</TableCell>
            <TableCell align='center'>
              {product?.terms && (
                <Link href={product?.terms} target='_blank' rel='noreferrer'>
                  Ver
                </Link>
              )}
            </TableCell>
          </TableRow>
        ))}
      </GeneralTable>
      {showDetailsProduct && (
        <Alert
          alertTitle='Descripción'
          alertTextButton='Cerrar'
          alertContentText={details}
          isOpen={showDetailsProduct}
          setIsOpen={handleShowDetails}
        />
      )}
    </Box>
  )
}

export default Products
