import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { styled } from '@mui/system'

export const CustomDialog = styled(Dialog)(() => ({
  textAlign: 'start',
  padding: '3.93rem 5.37rem',
  '& .MuiPaper-root ': {
    maxHeight: '100%',
  },
}))

export const CustomDialogTitle = styled(DialogTitle)(({ theme, error }) => ({
  color: `${error && theme.palette.error.main}`,
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '3rem',
  lineHeight: '2.5rem',
  padding: '3rem 3rem 1rem',
}))

export const CustomDialogContentText = styled(DialogContentText)(
  ({ theme }) => ({
    color: `${theme.palette.primary.main}`,
    fontSize: '1.12rem',
    lineHeight: '1.37rem',
    paddingBottom: '2rem',
  }),
)

export const CustomDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'center',
  padding: '2rem',
}))
