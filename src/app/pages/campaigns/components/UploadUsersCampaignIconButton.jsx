import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import readXlsxFile from 'read-excel-file'
import { CSVLink } from 'react-csv'
import UploadIcon from '../../../components/buttons/uploadIcon/UploadIcon'
import {
  assignUsers,
  resetCampaign,
} from '../../../slices/campaigns/campaignsSlice'
import { schema } from './schema'
import { Alert } from '../../../components/modals'

const UploadUsersCampaignIconButton = ({ campaignId, icon }) => {
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const [errorsExcel, setErrors] = useState([])
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const { campaign } = useSelector((state) => state.campaign)

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

    dataForm.append('users_file', file)

    if (event.target.files) {
      readXlsxFile(file, { schema })
        .then(({ errors }) => {
          if (errors.length > 0) {
            setErrors(errors)
            setIsOpenAlert(true)

            return
          }

          dispatch(assignUsers({ data: dataForm, campaignId }))
        })
        .finally(() => {
          inputRef.current.value = null
        })
    }
  }

  useEffect(() => {
    if (campaign && Object.entries(campaign)?.length !== 0) {
      dispatch(resetCampaign())
    }
  }, [campaign])

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
        toolTipInfo='Asignar usuarios a la campaña'
      >
        {icon}
      </UploadIcon>
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

UploadUsersCampaignIconButton.propTypes = {
  campaignId: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default UploadUsersCampaignIconButton
