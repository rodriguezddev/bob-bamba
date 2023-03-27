import React from 'react'
import PropTypes from 'prop-types'
import { Box, DialogContent, Typography } from '@mui/material'
import { MainButton } from '../../buttons'
import { CustomDialog, CustomDialogTitle, CustomDialogActions } from './styles'
import theme from '../../../theme'

const Alert = ({
  actionButton,
  alertTitle,
  alertContentText,
  alertTextButton,
  codeError,
  errorText,
  isOpen,
  isShowPrimaryButton,
  setIsOpen,
  primaryButtonTextAlert,
  width,
}) => {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <CustomDialog
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth
      onClose={handleClose}
      open={isOpen}
      width={width}
    >
      <CustomDialogTitle
        data-testid={`title-alert-${alertTitle}`}
        error={errorText ? 1 : 0}
        id='alert-dialog-title'
      >
        {alertTitle}
      </CustomDialogTitle>
      <DialogContent>
        <Box>{alertContentText}</Box>
        {codeError && (
          <Typography variant='body2' mt={2}>
            {`Código: ${codeError}`}
          </Typography>
        )}
      </DialogContent>
      <CustomDialogActions>
        <MainButton
          background={
            isShowPrimaryButton ? theme.palette.background.blueLight : ''
          }
          data-testid='close-button-alert'
          onClick={handleClose}
          type={isShowPrimaryButton ? 'secondary' : 'primary'}
        >
          {alertTextButton}
        </MainButton>
        {isShowPrimaryButton && (
          <MainButton onClick={() => actionButton()}>
            {primaryButtonTextAlert}
          </MainButton>
        )}
      </CustomDialogActions>
    </CustomDialog>
  )
}

Alert.propTypes = {
  actionButton: PropTypes.func,
  alertTitle: PropTypes.string.isRequired,
  alertContentText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  alertTextButton: PropTypes.string.isRequired,
  codeError: PropTypes.number,
  errorText: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isShowPrimaryButton: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
  primaryButtonTextAlert: PropTypes.string,
  width: PropTypes.string,
}

Alert.defaultProps = {
  actionButton: null,
  alertContentText: '',
  codeError: null,
  errorText: false,
  isShowPrimaryButton: false,
  primaryButtonTextAlert: 'Eliminar',
  width: '38rem',
}

export default Alert
