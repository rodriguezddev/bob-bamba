import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Grid, MenuItem } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Avatar } from '../../../components/avatar'
import { BackButton, MainButton } from '../../../components/buttons'
import { GeneralTitle } from '../../../components/texts'
import { getUser } from '../../../slices/user/userSlice'
import { MainInput, SelectInput } from '../../../components/inputs'
import ProductsNotActive from './components/ProductsNotActive'
import Subscriptions from './components/Subscriptions'
import RecoveryMessageForm from './components/RecoveryMessageForm'
import { resetRecoveryMessage } from '../../../slices/recoveryMessage/recoveryMessageSlice'
import { Alert } from '../../../components/modals'

const UserDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { message } = useSelector((state) => state.recoveryMessage)
  const { user } = useSelector((state) => state.user)
  const [showFormMessage, setShowFormMessage] = useState(false)

  useEffect(() => {
    dispatch(getUser(id))
  }, [])

  const handleShowFormMessage = () => {
    setShowFormMessage(!showFormMessage)
  }

  const handleRecoveryMessageSuccess = () => {
    dispatch(resetRecoveryMessage())
  }

  useEffect(() => {
    if (message.isSuccess) {
      handleShowFormMessage()
    }
  }, [message.isSuccess])

  return (
    <Box sx={{ width: '100%', marginBottom: '2rem' }}>
      <Grid>
        <BackButton />
        <GeneralTitle text='Detalles del usuario' />
        <Grid marginTop='.25rem'>
          <Avatar gender={user.gender} height='9.4rem' width='9.5rem' />
        </Grid>
        {user.cellphone && (
          <Box mt={5}>
            <MainButton
              data-testid='recovery-message-button'
              onClick={handleShowFormMessage}
              width='16rem'
            >
              Mensaje de recuperación&nbsp;
              <WhatsAppIcon />
            </MainButton>
          </Box>
        )}
      </Grid>
      <form>
        <Grid container my='2rem' spacing='2rem'>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Nombre(s)*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.name || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Primer Apellido*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                placeholder=''
                hiddenIcon
                radius='.5rem'
                value={user.lastname || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Segundo Apellido*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.second_lastname || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Email*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.email || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Fecha de nacimiento*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.birthdate}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='CURP*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.personal_id || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='RFC*' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                placeholder=''
                hiddenIcon
                radius='.5rem'
                value={user.tax_id || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Genero' />
            <Grid marginTop='.5rem'>
              <SelectInput
                disabled
                onChange={() => {}}
                value={user.gender || '-'}
              >
                <MenuItem value='-'>Seleccionar</MenuItem>
                <MenuItem value='M'>Masculino</MenuItem>
                <MenuItem value='F'>Femenino</MenuItem>
                <MenuItem value='O'>Otro</MenuItem>
              </SelectInput>
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle
              fontSize='.75rem'
              lineHeight='1rem'
              text='Teléfono*'
            />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user.cellphone || '-'}
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Partner' />
            <Grid marginTop='.5rem'>
              <MainInput
                disabled
                hiddenIcon
                placeholder=''
                radius='.5rem'
                value={user?.partner?.name || '-'}
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Subscriptions user={user} />
      <ProductsNotActive userId={id} />
      {message.isSuccess && (
        <Alert
          alertTextButton='Cerrar'
          alertTitle='¡Mensaje enviado!'
          alertContentText={`Se envío a ${user?.name} ${user.lastname}`}
          isOpen={message.isSuccess}
          setIsOpen={handleRecoveryMessageSuccess}
        />
      )}
      {showFormMessage && (
        <RecoveryMessageForm
          handleShowForm={handleShowFormMessage}
          open={showFormMessage}
          user={user}
        />
      )}
      {message.isSuccess && (
        <Alert
          alertTextButton='Cerrar'
          alertTitle='¡Mensaje enviado!'
          alertContentText={`Se envío a ${user?.name} ${user.lastname}`}
          isOpen={message.isSuccess}
          setIsOpen={handleRecoveryMessageSuccess}
        />
      )}
      {showFormMessage && (
        <RecoveryMessageForm
          handleShowForm={handleShowFormMessage}
          open={showFormMessage}
          user={user}
        />
      )}
    </Box>
  )
}

export default UserDetails
