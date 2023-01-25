/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { DialogContent } from '@mui/material'
import { MainButton } from '../../buttons'
import {
  CustomDialog,
  CustomDialogTitle,
  CustomDialogContentText,
  CustomDialogActions,
} from './styles'
import theme from '../../../theme'
import { assignProducts } from '../../../slices/partner/partnerSlice'

const ActionAlert = ({
  actionAlertTitle,
  actionAlertContentText,
  actionAlertTextButton,
  assignedProducts,
  assigner,
  children,
  errorText,
  isOpen,
  isShowPrimaryButton,
  primaryButtonTextAlert,
  setActionsIsOpen,
}) => {
  const { isLoading } = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const handleClose = () => {
    setActionsIsOpen(false)
  }

  const setProductAssigned = () => {
    const body = {
      partnerId: assigner.id,
      product: {
        products: assignedProducts,
      },
    }
    dispatch(assignProducts(body))
  }

  return (
    <CustomDialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xl'
      onClose={handleClose}
      open={isOpen}
    >
      <CustomDialogTitle error={errorText ? 1 : 0} id='alert-dialog-title'>
        {actionAlertTitle}
      </CustomDialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <CustomDialogContentText
          id='alert-dialog-description'
          sx={{
            textAlign: 'center',
          }}
        >
          {actionAlertContentText}
        </CustomDialogContentText>
        {children}
      </DialogContent>
      <CustomDialogActions>
        <MainButton
          background={
            isShowPrimaryButton ? theme.palette.background.blueLight : ''
          }
          onClick={handleClose}
          type={isShowPrimaryButton ? 'secondary' : 'primary'}
        >
          {actionAlertTextButton}
        </MainButton>
        {isShowPrimaryButton && (
          <MainButton disabled={isLoading} onClick={() => setProductAssigned()}>
            {primaryButtonTextAlert}
          </MainButton>
        )}
      </CustomDialogActions>
    </CustomDialog>
  )
}

ActionAlert.propTypes = {
  actionAlertTitle: PropTypes.string.isRequired,
  actionAlertContentText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]).isRequired,
  actionAlertTextButton: PropTypes.string.isRequired,
  assigner: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  assignedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      currency_code: PropTypes.string,
      price: PropTypes.string,
      sku: PropTypes.string,
    }),
  ).isRequired,
  children: PropTypes.node.isRequired,
  errorText: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isShowPrimaryButton: PropTypes.bool,
  primaryButtonTextAlert: PropTypes.string,
  setActionsIsOpen: PropTypes.func.isRequired,
}

ActionAlert.defaultProps = {
  errorText: false,
  isShowPrimaryButton: false,
  primaryButtonTextAlert: 'Eliminar',
}

export default ActionAlert
