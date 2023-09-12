import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import {
  createMessage,
  resetMessage,
} from '../../../slices/messages/messageSlice'
import FormMessage from '../components/formMessage'
import { Alert } from '../../../components/modals'

const CreateMessages = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formMessageHook = useForm()
  const { handleSubmit } = formMessageHook
  const { isLoading } = useSelector((state) => state.loading)
  const { message } = useSelector((state) => state.message)

  const onSubmit = (dataForm) => {
    const values = {
      partner_id: dataForm.partnerId,
      message: dataForm.message,
      type: dataForm.type,
      message_key: dataForm.messageKey,
      unidentified_user: dataForm.unidentifiedUser,
    }

    dispatch(createMessage(values))
  }

  const handleCloseDialogCreateMessage = () => {
    dispatch(resetMessage())
    navigate('/messages')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <BackButton />
      <Box display='flex' my={4} sx={{ justifyContent: 'space-between' }}>
        <GeneralTitle data-testid='title-create-message' text='Crear mensaje' />
      </Box>
      <FormMessage formMessageHook={formMessageHook} />
      <Box display='flex' my={4} sx={{ justifyContent: 'flex-end' }}>
        <MainButton
          data-testid='create-template-button'
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          radius='1.55rem'
          type='primary'
        >
          Enviar
        </MainButton>
      </Box>
      {message?.createMessage?.isSuccess && (
        <Alert
          alertContentText='Se creo el mensaje correctamente'
          alertTextButton='Cerrar'
          alertTitle='¡Registro exitoso!'
          isOpen={message?.createMessage?.isSuccess}
          setIsOpen={handleCloseDialogCreateMessage}
        />
      )}
    </Box>
  )
}

export default CreateMessages
