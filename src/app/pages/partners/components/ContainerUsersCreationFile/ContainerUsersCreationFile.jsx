import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import readXlsxFile from 'read-excel-file'
import { CSVLink } from 'react-csv'
import { DropZone } from '../../../../components/dropZone'
import { Alert } from '../../../../components/modals'
import { handleSubscriptionIsSuccess } from '../../../../slices/partner/partnerSlice'
import { formatDate } from '../../../../utils/utilsFormat'
import {
  getTextActionUploadFile,
  getTextErrorUploadFile,
} from '../../../../utils/UtilsTranslate'
import { usersWithoutEmailAndCellphone } from '../../../../utils/utilsUploadFile'
import { schema } from './schema'

const ContainerUsersCreationFile = ({ fileForm, partnerId }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorsExcel, setErrors] = useState([])
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [registerFile, setRegisterFile] = useState(null)
  const { resultSubscriptionFile } = useSelector((state) => state.partner)

  const errorsToShow = errorsExcel.map((item) => {
    const { type, ...rest } = item
    return rest
  })

  const handleAlertSuccess = () => {
    if (resultSubscriptionFile?.total_successfully_processed === 0) {
      dispatch(handleSubscriptionIsSuccess())
      setRegisterFile(null)
      fileForm(null)

      return
    }

    navigate('/users')
    dispatch(handleSubscriptionIsSuccess())
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
          const users = usersWithoutEmailAndCellphone(rows)

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

  const handleUnprocessedUsers = (usersErrors) => usersErrors.map((item) => {
    const { action, sku, user } = item

    return {
      name: user?.name,
      lastName: user?.lastname,
      secondLastname: user?.second_lastname,
      email: user?.email,
      cellphone: user?.cellphone,
      gender: user?.gender,
      birthdate: formatDate(user?.birthdate),
      rfc: user?.tax_id,
      curp: user?.personal_id,
      sku,
      action: getTextActionUploadFile(action),
      error: getTextErrorUploadFile(item.error),
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
      {resultSubscriptionFile?.isSuccess && (
        <Alert
          alertContentText={(
            <>
              <Typography component='span' variant='subtitle1'>
                <b>Total de registros:&nbsp;</b>
                {resultSubscriptionFile?.total_processed}
              </Typography>
              <br />
              <Typography component='span' variant='subtitle1'>
                <b>Cargados con éxito:&nbsp;</b>
                {resultSubscriptionFile?.total_successfully_processed}
              </Typography>
              <br />
              <Typography color='error' component='span' variant='subtitle1'>
                <b>Con error:&nbsp;</b>
                {resultSubscriptionFile?.total_unprocessed}
              </Typography>
              <br />
              <br />
              {resultSubscriptionFile?.unprocessed_users?.length !== 0 && (
                <CSVLink
                  data={handleUnprocessedUsers(
                    resultSubscriptionFile?.unprocessed_users,
                  )}
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
