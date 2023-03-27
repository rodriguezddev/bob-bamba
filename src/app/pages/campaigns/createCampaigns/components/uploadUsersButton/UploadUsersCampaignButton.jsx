import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'
import readXlsxFile from 'read-excel-file'
import { schema } from '../../../components/schema'
import { UploadButton } from '../../../../../components/buttons'
import { Alert } from '../../../../../components/modals'

const UploadUsersButton = ({ setUserFile }) => {
  const inputRef = useRef(null)
  const [errorsExcel, setErrors] = useState([])
  const [isOpenAlert, setIsOpenAlert] = useState(false)

  const errorsToShow = errorsExcel.map((item) => {
    const { type, ...rest } = item
    return rest
  })

  const handleChange = (event) => {
    const file = event.target.files && event.target.files[0]

    if (!file) {
      return
    }

    if (event.target.files) {
      readXlsxFile(file, { schema })
        .then(({ errors }) => {
          if (errors.length > 0) {
            setErrors(errors)
            setIsOpenAlert(true)

            return
          }

          setUserFile(file)
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
      <UploadButton
        accept='.xlsx'
        data-testid='create-product-button'
        height='3rem'
        onChange={handleChange}
        radius='1.55rem'
        ref={inputRef}
        type='primary'
        textButton='Asignar usuarios'
        width='18rem'
      />
      {isOpenAlert && (
        <Alert
          alertContentText={(
            <>
              Se encontraron errores, puedes descargar el archivo para mas
              detalles&nbsp;
              <CSVLink
                data={errorsToShow}
                filename='user-campaigns-upload-errors.csv'
              >
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

UploadUsersButton.propTypes = {
  setUserFile: PropTypes.func.isRequired,
}

export default UploadUsersButton
