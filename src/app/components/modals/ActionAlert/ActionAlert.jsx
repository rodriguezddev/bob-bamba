/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { DialogContent } from '@mui/material'
import { MainButton } from '../../buttons'
import {
  CustomActionDialog,
  CustomActionDialogTitle,
  CustomActionDialogContentText,
  CustomActionDialogActions,
} from './styles'
import theme from '../../../theme'

const ActionAlert = ({
  actionAlertTitle,
  actionAlertContentText,
  actionAlertTextButton,
  onClick,
  children,
  errorText,
  isOpen,
  isShowPrimaryButton,
  primaryButtonTextAlert,
  setActionsIsOpen,
}) => {
  const { isLoading } = useSelector((state) => state.loading)
  const handleClose = () => {
    setActionsIsOpen(false)
  }

  return (
    <CustomActionDialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='xl'
      onClose={handleClose}
      open={isOpen}
      sx={{ zIndex: '1200' }}
    >
      <CustomActionDialogTitle
        error={errorText ? 1 : 0}
        id='alert-dialog-title'
        sx={{
          textAlign: 'center',
        }}
      >
        {actionAlertTitle}
      </CustomActionDialogTitle>
      <DialogContent sx={{ padding: '2rem' }}>
        <CustomActionDialogContentText
          id='alert-dialog-description'
          sx={{
            textAlign: 'center',
          }}
        >
          {actionAlertContentText}
        </CustomActionDialogContentText>
        {children}
      </DialogContent>
      <CustomActionDialogActions>
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
          <MainButton disabled={isLoading} onClick={() => onClick()}>
            {primaryButtonTextAlert}
          </MainButton>
        )}
      </CustomActionDialogActions>
    </CustomActionDialog>
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
  children: PropTypes.node.isRequired,
  errorText: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isShowPrimaryButton: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  primaryButtonTextAlert: PropTypes.string,
  setActionsIsOpen: PropTypes.func.isRequired,
}

ActionAlert.defaultProps = {
  errorText: false,
  isShowPrimaryButton: false,
  primaryButtonTextAlert: 'Eliminar',
}

export default ActionAlert
