import { InputBase } from '@mui/material'
import { styled } from '@mui/system'

const CustomSelect = styled(InputBase)(
  ({
    border_color: borderColor, fontSize, height, theme, width,
  }) => ({
    '& .MuiInputBase-input': {
      backgroundColor: theme.palette.common.white,
      border: `0.13rem solid ${theme.palette.common.greyLight}`,
      borderRadius: '0.5rem',
      borderColor,
      boxSizing: 'border-box',
      color: theme.palette.primary.main,
      fontSize: `${fontSize}`,
      fontWeight: 400,
      height: `${height}`,
      lineHeight: '1.19rem',
      padding: '0.75rem 1rem',
      position: 'relative',
      width: `${width}`,
      '&:focus': {
        borderRadius: '0.63rem',
        borderColor: `${theme.palette.primary}`,
        boxShadow: `0 0 0 0.2rem ${theme.palette.common.shadow}`,
      },
    },
  }),
)

export default CustomSelect
