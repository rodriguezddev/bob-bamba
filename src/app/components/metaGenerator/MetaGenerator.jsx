import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, Grid, Typography } from '@mui/material'
import { GeneralTitle } from '../texts'
import { MainInput } from '../inputs'
import { MainButton } from '../buttons'
import theme from '../../theme'

const MetaGenerator = ({ setMetaContent, metaContent }) => {
  const [contentValues, setContentValues] = useState([])
  const { control } = useForm()

  const handleChangeContent = (index, event) => {
    const updatedContentValues = [...contentValues]
    const updatedContentItem = { ...updatedContentValues[index] }

    updatedContentItem[event.target.name] = event.target.value
    updatedContentValues[index] = updatedContentItem

    setMetaContent(
      updatedContentValues.reduce((convertedValues, item) => {
        convertedValues[item.key] = item.value
        return convertedValues
      }, {}),
    )

    setContentValues(updatedContentValues)
  }

  const handleDeleteInput = (index) => {
    const newContentValues = [...contentValues]

    newContentValues.splice(index, 1)
    setContentValues(newContentValues)
  }

  const handleAddInput = () => {
    setContentValues([...contentValues, { key: '', value: '' }])
  }

  useEffect(() => {
    const outputArr = []

    Object.keys(metaContent).forEach((key) => {
      outputArr.push({ key, value: metaContent[key] })
    })
    setContentValues(outputArr)
  }, [metaContent])

  return (
    <Box>
      <GeneralTitle
        fontSize='1rem'
        lineHeight='1.5rem'
        text='Agregar detalles extras'
      />
      <GeneralTitle
        fontSize='.65rem'
        fontWeight='500'
        lineHeight='1rem'
        marginBottom='1.5rem'
        text='Esta sección no es obligatoria'
      />
      <Grid
        item
        sx={{
          marginTop: '1rem',
        }}
      >
        {contentValues.map((item, index) => (
          <Box
            alignItems='center'
            display='flex'
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            sx={{
              padding: '1rem',
            }}
          >
            <Grid item marginRight='2rem'>
              <GeneralTitle fontSize='.75rem' lineHeight='1rem' text='Clave' />
              <Grid
                container
                flexDirection='column'
                justifyContent='center'
                marginTop='.5rem'
              >
                <Controller
                  control={control}
                  name={`key${index}`}
                  rules={{ required: 'El campo no puede estar vació' }}
                  render={({
                    field: { onChange },
                    fieldState: { error: errorInput },
                  }) => (
                    <Grid container flexDirection='column' marginTop='.5rem'>
                      <MainInput
                        error={!!errorInput}
                        hiddenIcon
                        id='key'
                        name='key'
                        onChange={onChange}
                        onInput={(event) => handleChangeContent(index, event)}
                        placeholder=''
                        radius='.5rem'
                        type='text'
                        value={item.key}
                      />
                      <Typography
                        color='error.main'
                        data-testid='error-message-name-key'
                        variant='caption'
                      >
                        {errorInput?.message}
                      </Typography>
                    </Grid>
                  )}
                />
              </Grid>
            </Grid>
            <Grid item marginRight='1rem'>
              <GeneralTitle
                fontSize='.75rem'
                lineHeight='1rem'
                text='Valores'
              />
              <Grid
                container
                flexDirection='column'
                justifyContent='center'
                marginTop='.5rem'
              >
                <Controller
                  control={control}
                  name={`value${index}`}
                  rules={{ required: 'El campo no puede estar vació' }}
                  render={({
                    field: { onChange },
                    fieldState: { error: errorInput },
                  }) => (
                    <Grid container flexDirection='column' marginTop='.5rem'>
                      <MainInput
                        error={!!errorInput}
                        hiddenIcon
                        id='value'
                        multiline
                        name='value'
                        onChange={onChange}
                        onInput={(event) => handleChangeContent(index, event)}
                        placeholder=''
                        radius='.5rem'
                        rows={1}
                        type='text'
                        value={item.value}
                      />
                      <Typography
                        color='error.main'
                        data-testid='error-message-name-value'
                        variant='caption'
                      >
                        {errorInput?.message}
                      </Typography>
                    </Grid>
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              display='flex'
              item
              justifyContent='flex-end'
              marginTop='2rem'
            >
              <MainButton
                background={theme.palette.background.blueLight}
                onClick={() => handleDeleteInput(index)}
                type='secondary'
                sx={{
                  height: '2rem',
                  minWidth: '2rem',
                  padding: '0rem',
                }}
                width='1rem'
              >
                <HighlightOffIcon sx={{ fontSize: '1.5rem' }} />
              </MainButton>
            </Grid>
          </Box>
        ))}
      </Grid>

      <Box marginTop='1rem'>
        <MainButton onClick={handleAddInput} type='primary' width='4rem'>
          <AddIcon sx={{ fontSize: '1.5rem' }} />
        </MainButton>
      </Box>
    </Box>
  )
}

MetaGenerator.propTypes = {
  setMetaContent: PropTypes.func.isRequired,
  metaContent: PropTypes.shape(),
}

MetaGenerator.defaultProps = {
  metaContent: {},
}

export default MetaGenerator
