import { styled } from '@mui/system'
import { InputBase } from '@mui/material'

const CustomTextField = styled(InputBase)(
  ({
    align, background, fontSize, height, theme, width,
  }) => ({
    padding: '1.5rem 1.75rem',
    background: `${background || theme.palette.common.white}`,
    border: `1px solid ${theme.palette.primary.main}`,
    boxSizing: 'border-box',
    borderRadius: '6.25rem',
    fontSize: `${fontSize}`,
    color: `${theme.palette.common.blue}`,
    width: `${width}`,
    height: `${height}`,
    '& .MuiInputBase-input': {
      textAlign: `${align}`,
    },
    '&.Mui-focused': {
      background: `${theme.palette.common.white}`,
    },
    '&.Mui-error': {
      borderColor: `${theme.palette.error.main}`,
      color: `${theme.palette.error.main}`,
    },
  }),
)

export default CustomTextField
