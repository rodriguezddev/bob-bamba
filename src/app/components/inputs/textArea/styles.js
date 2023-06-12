import { styled } from '@mui/system'
import { TextField } from '@mui/material'

const CustomTextArea = styled(TextField)(({ fontSize, radius, theme }) => ({
  background: theme.palette.common.white,
  border: `0.13rem solid ${theme.palette.common.greyLight}`,
  borderRadius: radius,
  boxSizing: 'border-box',
  color: theme.palette.common.black,
  fontSize: `${fontSize}`,
  '&.Mui-focused': {
    background: theme.palette.common.white,
  },
  '& .Mui-error': {
    border: `0.13rem solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    borderRadius: radius,
  },
}))

export default CustomTextArea
