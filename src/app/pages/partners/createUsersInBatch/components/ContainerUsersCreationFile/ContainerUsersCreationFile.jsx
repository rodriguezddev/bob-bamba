import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import readXlsxFile from 'read-excel-file'
import { CSVLink } from 'react-csv'
import { DropZone } from '../../../../../components/dropZone'
import { Alert } from '../../../../../components/modals'
import { resetUsersWithFile } from '../../../../../slices/partner/partnerSlice'
import { formatDate } from '../../../../../utils/utilsFormat'
import { getTextErrorUploadFile } from '../../../../../utils/UtilsTranslate'
import { validationFileUploadUsers } from '../../../../../utils/utilsUploadFile'
import { schema } from './schema'

const ContainerUsersCreationFile = ({ fileForm, partnerId }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorsExcel, setErrors] = useState([])
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [registerFile, setRegisterFile] = useState(null)
  const { usersWithFile } = useSelector((state) => state.partner)

  const errorsToShow = errorsExcel.map((item) => {
    const { type, ...rest } = item
    return rest
  })

  const handleAlertSuccess = () => {
    if (usersWithFile?.processed_total === 0) {
      dispatch(resetUsersWithFile())
      setRegisterFile(null)
      fileForm(null)

      return
    }

    navigate('/users')
    dispatch(resetUsersWithFile())
  }

  const handleChange = (event) => {
    const dataForm = new FormData()
    const file = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0]

    if (!file) {
      return
    }

    if (event.target.files || event.dataTransfer.files) {
      dataForm.append('file', file)
      dataForm.append('partner_id', partnerId)

      readXlsxFile(file, { schema })
        .then(({ rows, errors }) => {
          const users = validationFileUploadUsers(rows)

          if (errors.length > 0) {
            setErrors(errors)
            setIsOpenAlert(true)

            return
          }

          if (users.length !== 0) {
            setErrors(users)
            setIsOpenAlert(true)

            return
          }

          setRegisterFile(file)
          fileForm(dataForm)
        })
        .finally(() => {
          inputRef.current.value = null
        })
    }
  }

  const handleAlertError = () => {
    setIsOpenAlert(false)
    setErrors([])
  }

  const handleErrorsText = (array) => array.map((arr) => getTextErrorUploadFile(arr))

  const handleUnprocessedUsers = (usersErrors) => usersErrors?.map((item) => {
    const { errors, row } = item

    return {
      Nombre: row?.nombre,
      'Primer apellido': row?.primer_apellido,
      'Segundo apellido': row?.segundo_apellido,
      id: row?.id,
      email: row?.email,
      Sexo: row?.sexo_f_m,
      'Fecha de nacimiento': formatDate(row?.fecha_de_nacimiento_ddmmaaaa),
      Celular: row?.celular,
      RFC: row?.rfc,
      SKU: row?.sku,
      Movimiento: row?.movimiento_alta_baja,
      'Fecha de movimiento': row?.fecha_de_movimiento_ddmmaaaa,
      Error: handleErrorsText(errors),
    }
  })

  return (
    <>
      <DropZone
        accept='.xlsx'
        file={registerFile}
        onChange={handleChange}
        ref={inputRef}
      />
      {isOpenAlert && (
        <Alert
          alertContentText={(
            <>
              Se encontraron errores, puedes descargar el archivo para mas
              detalles&nbsp;
              <CSVLink data={errorsToShow} filename='user-upload-errors.csv'>
                aquí
              </CSVLink>
            </>
          )}
          alertTextButton='Cerrar'
          alertTitle='Error'
          errorText
          isOpen={isOpenAlert}
          setIsOpen={handleAlertError}
        />
      )}
      {usersWithFile?.isSuccess && (
        <Alert
          alertContentText={(
            <>
              <Typography component='span' variant='subtitle1'>
                <b>Total de registros:&nbsp;</b>
                {usersWithFile?.rows_total}
              </Typography>
              <br />
              <Typography component='span' variant='subtitle1'>
                <b>Cargados con éxito:&nbsp;</b>
                {usersWithFile?.processed_total || 0}
              </Typography>
              <br />
              <Typography color='error' component='span' variant='subtitle1'>
                <b>Con error:&nbsp;</b>
                {usersWithFile?.failed_data.length}
              </Typography>
              <br />
              <br />
              {usersWithFile?.failed_data?.length !== 0 && (
                <CSVLink
                  data={handleUnprocessedUsers(usersWithFile?.failed_data)}
                  filename='user-upload-unprocessed.csv'
                >
                  Ver detalle de errores
                </CSVLink>
              )}
            </>
          )}
          alertTextButton='Cerrar'
          alertTitle='Resultado'
          isOpen
          setIsOpen={handleAlertSuccess}
        />
      )}
    </>
  )
}

ContainerUsersCreationFile.propTypes = {
  fileForm: PropTypes.func.isRequired,
  partnerId: PropTypes.string,
}

ContainerUsersCreationFile.defaultProps = {
  partnerId: null,
}

export default ContainerUsersCreationFile
