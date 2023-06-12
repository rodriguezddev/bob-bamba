import { styled } from '@mui/system'
import { InputBase } from '@mui/material'

const CustomTextField = styled(InputBase)(
  ({
    align, fontSize, height, radius, theme, width,
  }) => ({
    background: theme.palette.common.white,
    border: `0.13rem solid ${theme.palette.common.greyLight}`,
    borderRadius: radius,
    boxSizing: 'border-box',
    color: theme.palette.primary.main,
    fontSize: `${fontSize}`,
    height: `${height}`,
    padding: '0.75rem 1rem',
    width: `${width}`,
    '& .MuiInputBase-input': {
      textAlign: `${align}`,
    },
    '&.Mui-focused': {
      background: theme.palette.common.white,
    },
    '&.Mui-error': {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  }),
)

export default CustomTextField
