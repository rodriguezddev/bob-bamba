/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import ProductsForm from '../components/productsForm'
import { BackButton, MainButton } from '../../../components/buttons'
import {
  getProductDetails,
  updateProduct,
} from '../../../slices/product/productSlice'
import { GeneralTitle } from '../../../components/texts'

const EditProducts = () => {
  const dispatch = useDispatch()
  const productsForm = useForm()
  const { id } = useParams()
  const { productDetails } = useSelector((state) => state.product)
  const { isLoading } = useSelector((state) => state.loading)
  const { handleSubmit, reset } = productsForm
  const [isCarrierEmpty, setIsCarrierEmpty] = useState(false)
  const [metaContent, setMetaContent] = useState({})
  const [descriptionContent, setDescriptionContent] = useState([])
  const [assignedCarries, setAssignedCarries] = useState([])

  const handleCarriesId = (carries) => carries.map((carrier) => carrier.id)

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [])

  useEffect(() => {
    if (isCarrierEmpty) {
      setIsCarrierEmpty(false)
    }
  }, [assignedCarries])

  useEffect(() => {
    if (productDetails) {
      const newCategories = productDetails?.categories?.map((item) => item.id)
      if (
        productDetails?.meta?.brief
        || productDetails?.meta?.description
        || productDetails?.meta?.saas_price
      ) {
        const {
          brief, description, saas_price, terms, ...nuevoObjeto
        } = productDetails.meta
        setMetaContent(nuevoObjeto)
      }

      const productDescription = productDetails?.meta?.description?.map(
        (item) => ({
          ...item,
          body: Array.isArray(item.body) ? item.body.join('\n') : item.body,
        }),
      )

      reset({
        sku: productDetails?.sku || '',
        name: productDetails?.name || '',
        is_recurrent: productDetails?.is_recurrent || false,
        expiration_unit: productDetails?.expiration_unit || '',
        expiration_period: productDetails?.expiration_period || '',
        status: productDetails?.status || '',
        carrier_services: productDetails?.carrier_services || '',
        categories: newCategories || [],
        is_saas: productDetails?.is_saas || false,
        terms: productDetails?.meta?.terms || '',
        brief: productDetails?.meta?.brief || '',
        price: productDetails?.meta?.saas_price || '',
      })

      setDescriptionContent(productDescription)
      setAssignedCarries(productDetails?.carrier_services)
    }
  }, [productDetails])

  const onSubmit = (dataForm) => {
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

    dispatch(updateProduct({ id: productDetails.id, data: values }))
  }

  return (
    <Box>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle
          data-testid='title-edit-product'
          text='Actualizar producto'
        />
      </Box>
      <ProductsForm
        assignedCarries={assignedCarries}
        descriptionContent={descriptionContent}
        isCarrierEmpty={isCarrierEmpty}
        metaContent={metaContent}
        productsForm={productsForm}
        setMetaContent={setMetaContent}
        setDescriptionContent={setDescriptionContent}
        setAssignedCarries={setAssignedCarries}
      />
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='edit-product-button'
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

export default EditProducts
