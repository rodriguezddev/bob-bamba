import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { styled } from '@mui/system'

export const CustomDialog = styled(Dialog)(({ width }) => ({
  textAlign: 'center',
  padding: '3.93rem 5.37rem',
  '& .MuiPaper-root': {
    maxWidth: `${width}`,
    maxHeight: '100%',
    padding: '2.5rem',
    width: `${width}`,
  },
}))

export const CustomDialogTitle = styled(DialogTitle)(({ theme, error }) => ({
  color: `${error && theme.palette.error.main}`,
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '2.5rem',
  lineHeight: '2.5rem',
}))

export const CustomDialogContentText = styled(DialogContentText)(
  ({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: '1rem',
    lineHeight: '1.37rem',
  }),
)

export const CustomDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'center',
}))
