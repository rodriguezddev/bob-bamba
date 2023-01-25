import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import readXlsxFile from 'read-excel-file'
import { CSVLink } from 'react-csv'
import { schema } from './schema'
import UploadIcon from '../../../../components/buttons/uploadIcon/UploadIcon'
import { Alert } from '../../../../components/modals'
import { createSubscriptionBatch } from '../../../../slices/partner/partnerSlice'

const UploadIconPartner = ({ partner, icon }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const [errorsExcel, setErrors] = useState([])
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const errorsToShow = errorsExcel.map((item) => {
    const { type, ...rest } = item
    return rest
  })

  const handleChange = (event) => {
    const dataForm = new FormData()
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    if (event.target.files) {
      dataForm.append('file', file)
      dataForm.append('partner_id', partner.id)

      readXlsxFile(file, { schema })
        .then(({ errors }) => {
          if (errors.length > 0) {
            setErrors(errors)
            setIsOpenAlert(true)

            return
          }

          dispatch(
            createSubscriptionBatch({ data: dataForm, partner: partner.name }),
          )
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

  return (
    <>
      <UploadIcon
        accept='.xlsx'
        color='primary'
        onChange={handleChange}
        ref={inputRef}
        toolTipInfo='Carga de usuarios con archivo'
      >
        {icon}
      </UploadIcon>
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
    </>
  )
}

UploadIconPartner.propTypes = {
  icon: PropTypes.element.isRequired,
  partner: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

export default UploadIconPartner
