import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import { styled } from '@mui/system'

export const CustomPdfViewerDialog = styled(Dialog)(() => ({
  padding: '3.93rem 5.37rem',
  '& .MuiDialog-container': {
    display: 'block',
    padding: '1rem',
  },
  '& .MuiPaper-root': {
    padding: '2.5rem',
    maxWidth: '100%',
  },
  textAlign: 'center',
}))

export const CustomPdfViewerDialogTitle = styled(DialogTitle)(
  ({ theme, error }) => ({
    color: `${error && theme.palette.error.main}`,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: '2.5rem',
    textAlign: 'start',
  }),
)

export const CustomPdfViewerDialogActions = styled(DialogActions)(() => ({
  justifyContent: 'flex-end',
}))
