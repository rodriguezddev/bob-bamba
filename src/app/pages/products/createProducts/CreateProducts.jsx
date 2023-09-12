import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { GeneralTitle } from '../../../components/texts'
import { BackButton, MainButton } from '../../../components/buttons'
import Alert from '../../../components/modals/Alert/Alert'
import {
  createProduct,
  resetProduct,
} from '../../../slices/product/productSlice'
import ProductsForm from '../components/productsForm'

const CreateProducts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { product } = useSelector((state) => state.product)
  const { isLoading } = useSelector((state) => state.loading)
  const [showAlert, setShowAlert] = useState(false)
  const productsForm = useForm()
  const { handleSubmit } = productsForm
  const [assignedCarries, setAssignedCarries] = useState([])
  const [isCarrierEmpty, setIsCarrierEmpty] = useState(false)
  const [metaContent, setMetaContent] = useState({})
  const [descriptionContent, setDescriptionContent] = useState([])

  useEffect(() => {
    if (isCarrierEmpty) {
      setIsCarrierEmpty(false)
    }
  }, [assignedCarries])

  const handleCarriesId = (carries) => carries.map((carrier) => carrier.id)

  const onSubmit = (dataForm) => {
    if (assignedCarries.length === 0) {
      setIsCarrierEmpty(true)
      return
    }

    const descriptionMeta = descriptionContent?.map((item) => {
      const updatedItem = {
        ...item,
        body: item.body.split('\n').filter(Boolean),
      }
      return updatedItem
    })

    const values = {
      sku: dataForm.sku.toUpperCase(),
      name: dataForm.name,
      is_recurrent: dataForm.is_recurrent,
      expiration_unit: dataForm.expiration_unit,
      expiration_period: dataForm.expiration_period,
      status: 'ACTIVE',
      carrier_services: handleCarriesId(assignedCarries),
      categories: dataForm.categories,
      is_saas: dataForm.is_saas,
      meta: {
        ...(metaContent && { ...metaContent }),
        ...(dataForm.brief && { brief: dataForm.brief }),
        ...(dataForm.terms && { terms: dataForm.terms }),
        ...(descriptionContent?.length !== 0 && {
          description: descriptionMeta,
        }),
        ...(dataForm.price && { saas_price: dataForm.price }),
      },
    }

    dispatch(createProduct(values))
  }

  const handleCloseAlert = () => {
    dispatch(resetProduct())
    setShowAlert(false)
    navigate('/products')
  }

  useEffect(() => {
    if (product && Object.entries(product)?.length !== 0) {
      setShowAlert(true)
    }
  }, [product])

  return (
    <Box sx={{ width: '100%' }}>
      {showAlert && (
        <Alert
          alertContentText={`Se creo el producto ${product?.name}`}
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={showAlert}
          setIsOpen={handleCloseAlert}
        />
      )}
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-create-product'
          text='Crear producto'
        />
      </Box>
      <ProductsForm
        assignedCarries={assignedCarries}
        isCarrierEmpty={isCarrierEmpty}
        productsForm={productsForm}
        setMetaContent={setMetaContent}
        setAssignedCarries={setAssignedCarries}
        setDescriptionContent={setDescriptionContent}
      />
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-product-button'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
    </Box>
  )
}

export default CreateProducts
